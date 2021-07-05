import React from 'react';
import { StyleSheet, TouchableOpacity , Text, ScrollView , View} from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios';
import Autocomplete from "react-native-autocomplete-input";
import PlacePreview from "./PlacePreview";
import ValidateButton from "../ValidateButton";
export default class AutoCompletePlaces extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            query: '',
            showPreview :false,
        }
    }

    findPlace(query) {
        if (query === '') {
            return [];
        }
        const { places } = this.props.places;
        const regex = new RegExp(`${query.trim()}`, 'i');
        return this.props.places.filter(place => place.adresse.search(regex) >= 0);
    }

    render() {
        const { query } = this.state;
        const places = this.findPlace(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        const placeHolderName = " Addresse du lieu de "+ this.props.name;
        if(!this.state.showPreview){
            return (
                <ScrollView>
                    <Autocomplete
                        autoCapitalize="none"
                        autoCorrect={false}
                        data={places.length === 1 && comp(query, places[0].adresse) ? [] : places}
                        defaultValue={query}
                        onChangeText={text => this.setState({ query: text })}
                        placeholder={placeHolderName}
                        containerStyle={styles.autocompleteContainer}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() =>
                            {
                                this.setState({ query: item.adresse });
                                this.props.changePlace(item.id);
                                this.setState({showPreview : true});
                            }
                            }>
                                <Text> {item.adresse +" ("+ (item.type ? item.type :  "chantier") +")"} </Text>
                            </TouchableOpacity>
                        )}
                    />
                </ScrollView>
            );
        }else{
            return (
                <PlacePreview idPlace={this.state.query}
                              unShowPreview={() => this.setState({showPreview:false})}
                              changePlace={(idPlace) => this.props.changePlace({idPlace})}
                              changeQuery={(query => this.setState({query}))}
                />
            );
        }
    }
}
const styles = StyleSheet.create({
    autocompleteContainer: {
        borderWidth: 0,
    },
});