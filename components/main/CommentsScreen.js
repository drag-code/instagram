import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	FlatList,
	TextInput,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import Theme from "../../theme/Theme";
import firebase from "firebase";
require("firebase/firestore");

const CommentsScreen = ({ route }) => {
	const [comments, setComments] = useState([]);
	const [postID, setPostID] = useState("");
	const [text, setText] = useState("");

	useEffect(() => {
		if (route.params.postID !== postID) {
			firebase
				.firestore()
				.collection("posts")
				.doc(route.params.uid)
				.collection("userPosts")
				.doc(route.params.postID)
				.collection("comments")
				.get()
				.then((snapshot) => {
					let comments = snapshot.docs.map((comment) => {
						const data = comment.data();
						const id = comment.id;
						return { id, ...data };
					});
					setComments(comments);
				});
			setPostID(route.params.postID);
		}
	}, [route.params.postID]);

	const commentPost = () => {
		firebase
			.firestore()
			.collection("posts")
			.doc(route.params.uid)
			.collection("userPosts")
			.doc(postID)
			.collection("comments")
			.add({
                text,
                creator: firebase.auth().currentUser.uid
            })
	};

	return (
		<View style={[Theme.container, Theme.bgWhite]}>
			<View style={styles.galleryContainer}>
				<FlatList
					numColumns={1}
					horizontal={false}
					data={comments}
					renderItem={({ item }) => (
						<View style={styles.imageContainer}>
							<Text style={Theme.container}>{item.text}</Text>
						</View>
					)}
				/>
				<View style={styles.postCommentSection}>
					<TextInput
						placeholder="Add a comment..."
						onChangeText={(text) => setText(text)}
						value={text}
					/>
					<TouchableOpacity style={styles.postButton} onPress={commentPost}>
						<Text>Post</Text>
					</TouchableOpacity>
				</View>
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
		marginBottom: 10,
	},
	displayComments: {
		fontSize: 16,
	},
	postButton: {
		borderRadius: 5,
		borderWidth: 1,
		borderColor: "#000",
		padding: 10,
	},
	postCommentSection: {
		flexDirection: "row",
	},
});

export default CommentsScreen;
