import React, { useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase";
require("firebase/firestore");

const SearchScreen = () => {
	const [users, setUsers] = useState([]);
    const navigation = useNavigation(); 

	const fetchUsers = (name) => {
		if (name) {
			firebase
				.firestore()
				.collection("users")
				.where("name", ">=", name)
				.where("name", "<=", name + "\uf8ff")
				.get()
				.then((snapshot) => {
					let fetchedUsers = snapshot.docs.map((user) => {
						const data = user.data();
						const id = user.id;
						return {
							id,
							...data,
						};
					});
					setUsers(fetchedUsers);
				})
				.catch((err) => console.log(err));
		}
        setUsers([])
	};

	return (
		<View>
			<TextInput
				style={styles.input}
				onChangeText={(name) => fetchUsers(name)}
				placeholder="Type anything..."
			/>
			{/* {users.length > 0 ? (
				<FlatList
					numColumns={1}
					horizontal={false}
					data={users}
					renderItem={({ item }) => <Text>{item.name}</Text>}
				/>
			) : (
				<></>
			)} */}
			<FlatList
				numColumns={1}
				horizontal={false}
				data={users}
				renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Profile', {uid: item.id})}>
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                )}
			/>
		</View>
	);
};

export default SearchScreen;

const styles = StyleSheet.create({
	input: {
		height: 40,
		borderRadius: 5,
		borderColor: "#c6c6c6c6",
		borderWidth: 1,
		padding: 10,
		marginBottom: 10,
		width: "80%",
	},
	resultsContainer: {},
});
