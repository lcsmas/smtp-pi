import React from "react";
import axios from 'axios'
import {Text, ActivityIndicator, View, ScrollView, AsyncStorage, Alert, FlatList} from "react-native";
import Config from "react-native-config";
import style from "../../Style";
import OffRouteRow from "./OffRouteRow";


export default class OffRouteHistory extends React.Component {
    constructor(props) {
        super(props);
        this.deleteWorkSite = this.deleteWorkSite.bind(this);
        this.reloadData = this.reloadData.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            report: null
        };
    }

    async componentDidMount() {
        await this.reloadData();
    }

    async handleDelete(id){
        Alert.alert(
            'Suppresion de chantier',
            'Etes-vous sûr de vouloir supprimer ce chantier ?',
            [
                {
                    text: 'OUI',
                    onPress: () => this.deleteWorkSite(id)
                },
                {
                    text: 'NON',
                    style: 'cancel'
                },
            ],
            { cancelable: false }
        );
    }

    async deleteWorkSite(id) {
        console.log(id);
        const token = await AsyncStorage.getItem('token');
        let data = { "id" : id};
        await axios({
            method : 'delete',
            url : Config.API_URL +'chantiers',
            headers: {'Authorization': 'Bearer ' + token},
            data: data
        })
            .then( response => {
                if(response.status !== 204){
                    console.log(response.status);
                    console.log(response.data);
                }
                let copy = this.state.report.slice();
                let index = copy.findIndex(worksite => worksite.id === id);
                if (index > -1) {
                    copy.splice(index, 1);
                    this.setState({
                        report : copy
                    })
                }
                console.log(response.data);
                console.log(response.status);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    async reloadData() {
        const token = await AsyncStorage.getItem('token');
        await axios({
            method : 'get',
            url : Config.API_URL + 'sorties',
            headers: {'Authorization': 'Bearer ' + token},
        })
            .then( response => {
                if(response.status !== 200){
                    console.log(response.status);
                    alert(response.status);
                    return response.status;
                }
                console.log(response.status);
                this.setState({report : response.data});
                return response.status;
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        if (this.state.report === null) {
            return (
                <View style={{paddingTop: 30}}>
                    <ActivityIndicator color="green" size="large"/>
                </View>
            )
        } else {
            return (
                <View>
                    <ScrollView>
                        <Text style={style.getStartedText}>Liste des sorties de route :</Text>
                        <FlatList
                            data={this.state.report}
                            renderItem={({item}) => <OffRouteRow item={item} onDelete={(id) =>this.handleDelete(id)}/>}
                        />
                    </ScrollView>
                </View>
            )
        }
    }
}
