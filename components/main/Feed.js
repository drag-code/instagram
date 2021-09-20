import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import firebase from "firebase";
require("firebase/firestore");
import Theme from "../../theme/Theme";
require("firebase/firestore");

const Feed = (props) => {
	const [posts, setPosts] = useState([]);
	const navigation = useNavigation();

	useEffect(() => {
		let posts = [];
		if (
			props.followedUsersLoaded === props.followedUsers.length &&
			props.followedUsers.length !== 0
		) {
			props.feed.sort((a, b) => a.created_at - b.created_at);
			setPosts(props.feed);
		}
	}, [props.followedUsersLoaded, props.feed]);

	const likePost = (userID, postID) => {
		firebase
			.firestore()
			.collection("posts")
			.doc(userID)
			.collection("userPosts")
			.doc(postID)
			.collection("likes")
			.doc(firebase.auth().currentUser.uid)
			.set({});
	};

	const dislikePost = (userID, postID) => {
		firebase
			.firestore()
			.collection("posts")
			.doc(userID)
			.collection("userPosts")
			.doc(postID)
			.collection("likes")
			.doc(firebase.auth().currentUser.uid)
			.delete();
	};

	return (
		<View style={[Theme.container, Theme.bgWhite]}>
			<View style={styles.galleryContainer}>
				<FlatList
					numColumns={1}
					horizontal={false}
					data={posts}
					renderItem={({ item }) => (
						<View style={styles.imageContainer}>
							<Text style={(Theme.container, { fontWeight: "bold" })}>
								{item.user.name}
							</Text>
							<Image style={styles.image} source={{ uri: item.downloadUrl }} />
							<Text
								onPress={() =>
									navigation.navigate("Comments", {
										postID: item.id,
										uid: item.user.uid,
									})
								}
								style={styles.displayComments}>
								View comments...
							</Text>
							<View style={styles.postActionsSection}>
								{item.currentUserLike ? (
									<MaterialCommunityIcons
										name="heart"
										size={26}
										onPress={() => dislikePost(item.user.uid, item.id)}
									/>
								) : (
									<MaterialCommunityIcons
										name="heart-outline"
										size={26}
										onPress={() => likePost(item.user.uid, item.id)}
									/>
								)}
							</View>
							<View style={styles.captionSection}>
								<Text style={(Theme.container, { fontWeight: "bold", marginRight: 10 })}>
									{item.user.name}
								</Text>
								<Text>{item.caption}</Text>
							</View>
						</View>
					)}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	galleryContainer: {},
	image: {
		flex: 1,
		aspectRatio: 1 / 1,
	},
	imageContainer: {
		flex: 1 / 3,
		marginBottom: 10,
	},
	displayComments: {
		fontSize: 16,
	},
	captionSection: {
		flexDirection: "row",
	},
});

const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser,
	followedUsers: store.userState.followedUsers,
	feed: store.usersState.feed,
	followedUsersLoaded: store.usersState.followedUsersLoaded,
});

export default connect(mapStateToProps, null)(Feed);
