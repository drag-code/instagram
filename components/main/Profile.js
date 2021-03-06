import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet, Button } from "react-native";
import { connect } from "react-redux";
import firebase from "firebase";
import Theme from "../../theme/Theme";
import FollowButton from "../FollowButton";
require("firebase/firestore");

const Profile = (props) => {
	const [userPosts, setUserPosts] = useState([]);
	const [user, setUser] = useState(null);
	const [following, setFollowing] = useState(false);

	useEffect(() => {
		const { currentUser, posts } = props;
		if (props.route.params.uid === firebase.auth().currentUser.uid) {
			setUser(currentUser);
			setUserPosts(posts);
		} else {
			fetchNotAuthUserData();
		}

		if (props.followedUsers.indexOf(props.route.params.uid) > -1) {
			setFollowing(true)
		} else {
			setFollowing(false)
		}
	}, [props.route.params.uid, props.followedUsers]);

	const followHandler = () => {
		firebase
			.firestore()
			.collection("following")
			.doc(firebase.auth().currentUser.uid)
			.collection("followedUsers")
			.doc(props.route.params.uid)
			.set({});
	};

	const unfollowHandler = () => {
		firebase
			.firestore()
			.collection("following")
			.doc(firebase.auth().currentUser.uid)
			.collection("followedUsers")
			.doc(props.route.params.uid)
			.delete();
	};

	const fetchNotAuthUserData = () => {
		firebase
			.firestore()
			.collection("users")
			.doc(props.route.params.uid)
			.get()
			.then((snapshot) => {
				if (snapshot.exists) {
					setUser(snapshot.data());
				} else {
					console.log("Not supported action");
				}
			});

		firebase
			.firestore()
			.collection("posts")
			.doc(props.route.params.uid)
			.collection("userPosts")
			.orderBy("created_at", "asc")
			.get()
			.then((snapshot) => {
				let posts = snapshot.docs.map((post) => {
					const data = post.data();
					const id = post.id;
					return {
						id,
						...data,
					};
				});
				setUserPosts(posts);
			});
	};

	const logout = () => {
		firebase.auth().signOut();
	}

	if (user === null) return <></>;

	return (
		<View style={[Theme.container, Theme.bgWhite]}>
			<View style={styles.infoContainer}>
				<Text>{user.name}</Text>
				<Text>{user.email}</Text>
			</View>
			{
				props.route.params.uid !== firebase.auth().currentUser.uid ? 
				(<FollowButton following={following} handlers={[followHandler, unfollowHandler]}/>) :
				<Button title="Logout" onPress={logout}/>
			}
			<View style={styles.galleryContainer}>
				<FlatList
					numColumns={3}
					horizontal={false}
					data={userPosts}
					renderItem={({ item }) => (
						<View style={styles.imageContainer}>
							<Image style={styles.image} source={{ uri: item.downloadUrl }} />
						</View>
					)}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	infoContainer: {
		alignItems: "center",
		marginBottom: 5
	},
	galleryContainer: {},
	image: {
		flex: 1,
		aspectRatio: 1 / 1,
	},
	imageContainer: {
		flex: 1 / 3,
	},
});

const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser,
	posts: store.userState.posts,
	followedUsers: store.userState.followedUsers
});

export default connect(mapStateToProps, null)(Profile);
