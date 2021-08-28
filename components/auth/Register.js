import React, { useState } from "react";
import initFirebase from "../../config/firebase";
import { View, TextInput, Button, StyleSheet } from "react-native";
import Theme from "../../theme/Theme";

export const Register = () => {
	const [fields, setFields] = useState(() => ({
		email: "",
		name: "",
		password: "",
	}));
	const firebase = initFirebase();

	const register = () => {
		const { email, password, name } = fields;
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((res) => {
				firebase
					.firestore()
					.collection("users")
					.doc(firebase.auth().currentUser.uid)
					.set({ name, email });
			})
			.catch((error) => console.log(error));
	};

	return (
		<View style={Theme.container}>
			<View style={Theme.content}>
				<TextInput
					style={styles.input}
					placeholder="name"
					onChangeText={(text) => setFields({ ...fields, name: text })}
				/>
				<TextInput
					style={styles.input}
					placeholder="email"
					onChangeText={(text) => setFields({ ...fields, email: text })}
				/>
				<TextInput
					secureTextEntry={true}
					style={styles.input}
					placeholder="password"
					onChangeText={(text) => setFields({ ...fields, password: text })}
				/>
				<Button title="Register" onPress={register} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		height: 40,
		borderRadius: 5,
		borderColor: "#c6c6c6c6",
		borderWidth: 1,
		padding: 10,
		marginBottom: 10,
		width: "80%"
	},
});
