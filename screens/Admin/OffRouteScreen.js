import * as React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import OffRouteHistory from "../../components/Road/OffRouteHistory";
import MapHistory from "../../components/Road/MapHistory";
import LogoutButton from "../../components/LogoutButton";
const HomeStack = createStackNavigator();

export default function OffRouteScreen() {
    return (
        <HomeStack.Navigator screenOptions={{headerRight : () => (<LogoutButton/>)}}>
            <HomeStack.Screen
                name="offRoute"
                component={OffRouteHistory}
                options={() => ({headerTitle: "Sorties de route",})}
            />
            <HomeStack.Screen
                name="mapHistory"
                component={MapHistory}
                options={() => ({headerTitle: "Carte sortie de route",})}
            />
        </HomeStack.Navigator>
    );
}

