import React from "react";
import { View, Text, Button } from "react-native";
import Theme from "../../theme/Theme";
import {useNavigation} from '@react-navigation/native'

export const Landing = () => {

    const navigation = useNavigation();

	return (
    <View style={Theme.container}>
        <Button title="Register" onPress={() => navigation.navigate("Register")}/>
        <Button title="Login" onPress={() => navigation.navigate("Login")}/>
    </View>
    );
};
