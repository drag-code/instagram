import React, { useState } from "react";
import initFirebase from "../../config/firebase";
import { View, TextInput, Button, StyleSheet } from "react-native";
import Theme from "../../theme/Theme";

const Login = () => {
	const [fields, setFields] = useState(() => ({
		email: "",
		password: "",
	}));
	const firebase = initFirebase();

	const login = () => {
		const { email, password } = fields;
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((res) => {
				console.log(" OK ");
			})
			.catch((error) => console.log(error));
	};

	return (
		<View style={Theme.container}>
			<View style={Theme.content}>
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
				<Button title="Login" onPress={login} />
			</View>
		</View>
	);
};

export default Login;

const styles = StyleSheet.create({
	input: {
		height: 40,
		borderRadius: 5,
		borderColor: "#c6c6c6c6",
		borderWidth: 1,
		padding: 10,
		marginBottom: 10,
	},
});
