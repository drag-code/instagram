import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser, fetchPosts } from "../redux/actions/index";
import Theme from "../theme/Theme";
import { Feed } from "../components/main/Feed";
import Profile from "../components/main/Profile";
import { EmptyScreen } from "../components/EmptyScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

const MainScreen = (props) => {
	useEffect(() => {
		props.fetchUser();
		props.fetchPosts();
	}, []);

	const { currentUser } = props;

	return (
		<Tab.Navigator>
			<Tab.Screen
				name="Feed"
				component={Feed}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="home" color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="account" color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name="AddContainer"
				component={EmptyScreen}
				listeners={({navigation}) => ({
					tabPress: event => {
						event.preventDefault();
						navigation.navigate("AddPhoto")
					}
				})}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="plus-box" color={color} size={26} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser,
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ fetchUser, fetchPosts }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
