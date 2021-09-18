import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const FollowButton = ({ following, handlers }) => {
	const text = following ? "Unfollow" : "Follow";
	const background = following ? "#edcecc" : "#2582f5";
    const action = following ? handlers[1] : handlers[0];
	return (
		<View>
			<TouchableOpacity
				style={[styles.button, { backgroundColor: background }]}
				onPress={action}>
				<Text style={styles.text}>{text}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default FollowButton;

const styles = StyleSheet.create({
	button: {
		borderRadius: 5,
		borderWidth: 2,
		borderColor: "#fff",
		padding: 10,
		alignItems: "center",
	},
	text: {
		fontSize: 16,
		color: "#fff",
	},
});
