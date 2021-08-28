import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
import { Landing } from "./components/auth/Landing";
import { Register } from "./components/auth/Register";
import Login from "./components/auth/Login";
import Loader from "./components/Loader";
import MainScreen from "./screens/MainScreen";
import { AddPhoto } from "./components/main/AddPhoto";
import { SaveScreen } from "./components/main/SaveScreen";
import initFirebase from "./config/firebase";

const Stack = createNativeStackNavigator();
const store = createStore(rootReducer, applyMiddleware(thunk));

const Auth = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Landing" component={Landing} />
			<Stack.Screen name="Register" component={Register} />
			<Stack.Screen name="Login" component={Login} />
		</Stack.Navigator>
	);
};

export default function App() {
	const firebase = initFirebase();
	const [auth, setAuth] = useState(() => ({
		loaded: false,
	}));

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			if (!user) {
				setAuth({ loggedIn: false, loaded: true });
			} else {
				setAuth({ loggedIn: true, loaded: true });
			}
		});
	}, []);

	const { loggedIn, loaded } = auth;

	if (!loaded) return <Loader />;
	if (!loggedIn) return <NavigationContainer>{Auth()}</NavigationContainer>;

	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Main">
					<Stack.Screen
						name="Main"
						component={MainScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen name="AddPhoto" component={AddPhoto} />
					<Stack.Screen name="Save" component={SaveScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
