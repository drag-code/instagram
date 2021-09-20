import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import Theme from "../../theme/Theme";
require("firebase/firestore");

const Feed = (props) => {
	const [posts, setPosts] = useState([]);
	const navigation = useNavigation();

	useEffect(() => {
		let posts = [];
		if (props.usersLoaded === props.followedUsers.length) {
			for (let index = 0; index < props.followedUsers.length; index++) {
				const user = props.users.find(
					(user) => user.uid === props.followedUsers[index]
				);
				if (user !== undefined) posts = [...posts, ...user.posts];
			}
			posts.sort((a, b) => a.created_at - b.created_at);
			setPosts(posts);
		}
	}, [props.usersLoaded]);

	return (
		<View style={[Theme.container, Theme.bgWhite]}>
			<View style={styles.galleryContainer}>
				<FlatList
					numColumns={1}
					horizontal={false}
					data={posts}
					renderItem={({ item }) => (
						<View style={styles.imageContainer}>
							<Text style={Theme.container}>{item.user.name}</Text>
							<Image style={styles.image} source={{ uri: item.downloadUrl }} />
							<Text
								onPress={() =>
									navigation.navigate("Comments", { postID: item.id, uid: item.user.uid })
								}
								style={styles.displayComments}>
								View comments...
							</Text>
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
});

const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser,
	followedUsers: store.userState.followedUsers,
	users: store.usersState.users,
	usersLoaded: store.usersState.usersLoaded,
});

export default connect(mapStateToProps, null)(Feed);
