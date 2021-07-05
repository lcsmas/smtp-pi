import React from "react";
import MapView from 'react-native-maps'
import { UrlTile} from 'react-native-maps'
import {
    Text,
    View,
    FlatList,
    Dimensions,
    StyleSheet,
    PermissionsAndroid,
    AsyncStorage,
    AppState,
    TouchableOpacity, Button, TextInput
} from "react-native";
import TruckMarker from './TruckMarker';
import {Marker, Circle} from "react-native-maps";
import axios from 'axios';
import CraneView from "../Crane/CraneView";
import io from "socket.io-client";
import KeepAwake from 'react-native-keep-awake';
import Config from "react-native-config";
import Icon from "react-native-vector-icons/FontAwesome5";
import FuelForm from "../FuelForm";

const { width, height } = Dimensions.get("window");


export default class MapAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.handleConnection = this.handleConnection.bind(this);
        this.handleProbleme = this.handleProbleme.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.handleDisconnection = this.handleDisconnection.bind(this);
        this.handleCoordinates = this.handleCoordinates.bind(this);
        this.componentDidMount =this.componentDidMount.bind(this);
        this.succesConnection = this.succesConnection.bind(this);
        this.enableConnection = this.enableConnection.bind(this);
        this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this)
        this.changeShowFuelForm = this.changeShowFuelForm.bind(this)
        this.socket = io(Config.API_URL);
        this.state = {
          socket : null,
          showFuelForm : false,
          currentRegion : {
            latitude: this.props.chargement.latitude,
            longitude: this.props.chargement.longitude,
            latitudeDelta: 0.15,
            longitudeDelta: 0.0421,
          },
          connected : false,
          users: [],
          etat : null,
          appState: AppState.currentState,
        };
    }

    async componentDidMount(){
        this.enableConnection();
        AppState.addEventListener('change', this.handleAppStateChange);
    }

    // enable socket connection
    async enableConnection(){
      console.log("launch enable !");
      const userId  = await AsyncStorage.getItem('userId');
      await this.socket.emit("chantier/connect", {
          "userId" : userId,
          "chantierId" : this.props.worksite.id,
      });
      await this.socket.on("chantier/connect/success", this.succesConnection);
      await this.socket.on("chantier/user/connected", this.handleConnection);
      await this.socket.on("chantier/user/disconnected", this.handleDisconnection);
      await this.socket.on("chantier/user/sentCoordinates", this.handleCoordinates);
    }


    // close connection to socket
    async closeConnection(){
      await this.socket.emit("chantier/disconnect","")
      console.log("Admin : Close connection to socket");
      this.socket.close();
    }

    async componentWillUnmount(){
      this.closeConnection();
      AppState.removeEventListener('change', this.handleAppStateChange);
    }

    // update map when an user connect or disconnect
    shouldComponentUpdate(nextProps, nextState) {
        return nextState.users.length !== this.state.users.length
        || nextState.showFuelForm !== this.state.showFuelForm
    }

    // handle when app is in foreground/background
    // return in list of worksite if back to foreground
    handleAppStateChange = async (nextAppState) => {
      if (nextAppState === "active" ) {
        const userId  = await AsyncStorage.getItem('userId');
        console.log(this.socket.connected);
        await this.socket.emit("chantier/connect", {
            "userId" : userId,
            "chantierId" : this.props.worksite.id,
        });
      }
      this.setState({appState: nextAppState});
    }


    // delete in user array the user disconnecting
    handleDisconnection(data){
        console.log("Admin:" + data.userId + " disconnect");
        let copy = this.state.users.slice();
        let index = copy.findIndex(s => s.userId == data.userId);
        if (index > -1) {
            copy.splice(index, 1);
            this.setState({
                users : copy
            })
        }
    }

    succesConnection(data){
        console.log("Admin: ACK connection");
    }

    async handleConnection(data){
        console.log("Admin: " + data.userId +" is connected")
        // check if the user connecting is an admin
        let isAdmin = Object.keys(data.coordinates).length === 0 && data.coordinates.constructor === Object;
        if(!isAdmin){
            let copy = this.state.users.slice();
            let index = copy.findIndex(s => s.userId == data.userId);
            if (index > -1) {
                copy.splice(index, 1);
            }
            copy.push(data);
            this.setState({
                users : copy
            });
        }
    }

    async handleProbleme(userId,etat){
        // get Info of user
        let userInfo = await this.getUserInfo("camionneurs",userId);
        if(userInfo == -1){
            userInfo = await this.getUserInfo("grutiers",userId);
        }
        console.log(userInfo);
        let msg = userInfo.prenom + " " + userInfo.nom;
        if(etat == "probleme"){
            msg = msg + " a un problème ! Veuillez le contactez au plus vite !"
        }else{
            msg = msg + " a une urgence ! Veuillez le contactez au plus vite !"
        }
        alert(msg);
    }

    async getUserInfo(typeUser,userId){
        const token  = await AsyncStorage.getItem('token');
        return axios({
            method: 'get',
            url: Config.API_URL + typeUser + '/' + userId,
            headers: {'Authorization': 'Bearer ' + token},
        })
            .then( response => {
                if(response.status != 200){
                    console.log(response.status);
                    return -1
                }
                console.log(response.status)
                return response.data.rayon
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    changeShowFuelForm(){
        this.setState({showFuelForm: !this.state.showFuelForm})
        console.log("showFuelForm : " + this.state.showFuelForm)
    }

    onRegionChangeComplete(region){
      this.setState({currentRegion : region})
    }

    async handleCoordinates(data){
        //console.log("Admin: coordinates receive: " + JSON.stringify(data));
        // handle if receive probleme:
        if(data.etat == "probleme" || data.etat == "urgence"){
            this.handleProbleme(data.userId,data.etat);
        }
        let copy = this.state.users.slice();
        let index = copy.findIndex(s => s.userId == data.userId);
        if( index != -1){
            copy[index] = data;
            this.setState({users : copy});
        }else{
            copy.push(data);
            this.setState({users : copy});
        }
    }

    render() {
        console.log("users:" + JSON.stringify(this.state.users));
        const chargement = {latitude : this.props.chargement.latitude, longitude : this.props.chargement.longitude};
        const dechargement = {latitude : this.props.dechargement.latitude, longitude : this.props.dechargement.longitude};
        console.log("showFuelForm " + this.state.showFuelForm)
        return(
            <View style={{flex : 1}}>
                      <KeepAwake/>
                        <MapView
                            style={this.props.typeOfUser === "crane" ? styles.mapCrane : styles.map}
                            region={this.state.currentRegion}
                            onRegionChangeComplete={this.onRegionChangeComplete}
                        >
                            <Marker coordinate={chargement} title={"chargement"} pinColor={"#000eff"}/>
                            <Marker coordinate={dechargement} title={"dechargement"} pinColor={"#000eff"}/>
                            <Circle key={"chargementCircle"} center={chargement} radius={this.props.chargement.rayon}/>
                            <Circle key={"dechargementCircle"} center={dechargement} radius={this.props.dechargement.rayon}/>
                            {this.state.users.map(marker => {
                                    return (<TruckMarker key={marker.userId} user={marker} singleChantier = {true} socket={this.socket}/>)
                                }
                            )}
                        </MapView>
                <View>
                    {(this.state.showFuelForm ) &&
                       <FuelForm  toggleShow={this.changeShowFuelForm} />
                    }
                    {this.props.typeOfUser === "crane" ?
                        <TouchableOpacity
                            style={{
                                borderWidth:1,
                                borderColor:'#01a699',
                                position : "absolute",
                                bottom: 200,
                                right: 0,
                                alignItems:'center',
                                justifyContent:'center',
                                width:50,
                                height:50,
                                backgroundColor:'#fff',
                                borderRadius:50,
                            }}
                            onPress={this.changeShowFuelForm}
                        >
                            <Icon name={"gas-pump"}  size={25} color="#01a699" />
                        </TouchableOpacity>: null}
                </View>
                    {this.props.typeOfUser === "crane" ? <CraneView auChargement={this.props.auChargement} users={this.state.users} socket={this.socket}/> : null}
          </View>
        )
    }
}

const styles = StyleSheet.create({
    map: {
        width : width,
        height: height,
    },
    mapCrane: {
        width : width,
        height: height,
    },
});
