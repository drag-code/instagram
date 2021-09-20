import React, { useState } from "react";
import { View, TextInput, Image, StyleSheet, Button } from "react-native";
import Theme from "../../theme/Theme";
import firebase from "firebase";
import {useNavigation} from "@react-navigation/native";
require("firebase/firestore");
require("firebase/firebase-storage");

export const SaveScreen = ({ route }) => {
	const [caption, setCaption] = useState(() => "");
	const navigation = useNavigation();

	const savePost = async () => {
		const imageUrl = route.params.picture;
		try {
			console.log(imageUrl);
			const response = await fetch(imageUrl);
			const blob = await response.blob();
			const task = firebase
				.storage()
				.ref()
				.child(
					`post/${firebase.auth().currentUser.uid}/${Math.random().toString(
						36
					)}`
				)
				.put(blob);
			const taskProgress = (snapshot) => {
				console.log(`transferrred: ${snapshot.bytesTransferred}`);
			};
			const taskCompleted = () => {
				task.snapshot.ref.getDownloadURL().then((snapshot) => {
					savePostInProfile(snapshot)
				});
			};
			const errors = (snapshot) => {
				savePostInProfile(snapshot);
				console.log(snapshot);
			};

			task.on("state_changed", taskProgress, errors, taskCompleted);
		} catch (error) {
			console.error(error);
		}
	};

	const savePostInProfile = (downloadUrl) => {
		firebase
			.firestore()
			.collection("posts")
			.doc(firebase.auth().currentUser.uid)
			.collection("userPosts")
			.add({ 
				downloadUrl,
				caption,
				likesCount: 0,
				created_at: firebase.firestore.FieldValue.serverTimestamp()
			}).then(() => {
				navigation.popToTop();
			})
	};

	return (
		<View style={Theme.container}>
			<View style={Theme.content}>
				<Image source={{ uri: route.params.picture }} style={{ flex: 1 }} />
				<TextInput
					style={styles.input}
					placeholder="Write something about it"
					value={caption}
					onChangeText={(text) => setCaption(text)}
				/>
				<Button title="Save" onPress={savePost} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		width: "80%",
		height: 40,
		backgroundColor: "#fff",
		padding: 10,
	},
});
