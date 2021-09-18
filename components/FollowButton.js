import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const FollowButton = ({ following, handlers }) => {
	const text = following ? "Unfollow" : "Follow";
	const background = following ? "#fff" : "#2582f5";
    const fontColor = following ? "#000" : "#fff";
    const action = following ? handlers[1] : handlers[0];
	return (
		<View>
			<TouchableOpacity
				style={[styles.button, { backgroundColor: background }]}
				onPress={action}>
				<Text style={[styles.text, {color: fontColor}]}>{text}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default FollowButton;

const styles = StyleSheet.create({
	button: {
		borderRadius: 5,
		borderWidth: 1,
		borderColor: "#000",
		padding: 10,
		alignItems: "center",
        marginHorizontal: "5%"
	},
	text: {
		fontSize: 16
	},
});
