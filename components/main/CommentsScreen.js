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
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchUsersData} from "../../redux/actions/index";
require("firebase/firestore");

const CommentsScreen = (props) => {
	const [comments, setComments] = useState([]);
	const [postID, setPostID] = useState("");
	const [text, setText] = useState("");

	useEffect(() => {
		function matchUserToComment(com) {
			for (let i = 0; i < com.length; i++) {
				if (com[i].hasOwnProperty("user")) continue;
				const user = props.users.find(user => user.uid === com[i].creator);
				if (user == undefined) {
					props.fetchUsersData(com[i].creator, false);
				} else {
					com[i].user = user;
				}
			}
			setComments(com);
		}
		if (props.route.params.postID !== postID) {
			firebase
				.firestore()
				.collection("posts")
				.doc(props.route.params.uid)
				.collection("userPosts")
				.doc(props.route.params.postID)
				.collection("comments")
				.onSnapshot((snapshot) => {
					let comments = snapshot.docs.map((comment) => {
						const data = comment.data();
						const id = comment.id;
						return { id, ...data };
					});
					matchUserToComment(comments);
				});
			setPostID(props.route.params.postID);
		} else {
			matchUserToComment(comments);
		}
	}, [props.route.params.postID, props.users]);

	const commentPost = () => {
		firebase
			.firestore()
			.collection("posts")
			.doc(props.route.params.uid)
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
							{
								item.user !== undefined ?
								(<Text style={{fontWeight: "bold"}}>{item.user.name}</Text>) :
								null
							}
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

const mapStateToProps = (store) => ({
	users: store.usersState.users,
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ fetchUsersData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CommentsScreen);
