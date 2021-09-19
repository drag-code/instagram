import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser, fetchPosts, fetchFollowedUsers } from "../redux/actions/index";
import Theme from "../theme/Theme";
import Feed from "../components/main/Feed";
import Profile from "../components/main/Profile";
import SearchScreen from "../components/main/Search";
import { EmptyScreen } from "../components/EmptyScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from "firebase";

const Tab = createBottomTabNavigator();

const MainScreen = (props) => {
	useEffect(() => {
		props.fetchUser();
		props.fetchPosts();
		props.fetchFollowedUsers();
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
				name="Search"
				component={SearchScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="magnify" color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={Profile}
				listeners={({navigation}) => ({
					tabPress: event => {
						event.preventDefault();
						navigation.navigate("Profile", {uid: firebase.auth().currentUser.uid})
					}
				})}
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
	bindActionCreators({ fetchUser, fetchPosts, fetchFollowedUsers }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
