import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

export const AddPhoto = () => {
	const [hasPermission, setHasPermission] = useState(null);
	const [hasGalleryPermission, sethasGalleryPermission] = useState(null);
	const [camera, setCamera] = useState(null);
	const [picture, setPicture] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);
	const navigation = useNavigation();

	useEffect(() => {
		(async () => {
			const cameraStatus = await Camera.requestPermissionsAsync();
			setHasPermission(cameraStatus.status === "granted");
			const galleryStatus =
				await ImagePicker.requestMediaLibraryPermissionsAsync();
			sethasGalleryPermission(galleryStatus.status === "granted");
		})();
	}, []);

	if (hasPermission === null || hasGalleryPermission === false) {
		return <View />;
	}
	if (hasPermission === false || hasGalleryPermission === false) {
		return <Text>No access to camera</Text>;
	}

	const takeShot = async () => {
		if (camera) {
			const data = await camera.takePictureAsync(null);
			setPicture(data.uri);
		}
	};

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		console.log(result);

		if (!result.cancelled) {
			setPicture(result.uri);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.cameraContainer}>
				<Camera
					ref={(ref) => setCamera(ref)}
					style={styles.camera}
					type={type}
					ratio={"1:1"}
				/>
			</View>
			<Button
				title="Flip camera"
				onPress={() => {
					setType(
						type === Camera.Constants.Type.back
							? Camera.Constants.Type.front
							: Camera.Constants.Type.back
					);
				}}></Button>
			<Button title="Take a shot" onPress={takeShot}></Button>
			<Button title="Pick an image" onPress={pickImage}></Button>
			<Button
				title="Save"
				onPress={() => navigation.navigate("Save", { picture })}></Button>

			{picture && <Image source={{ uri: picture }} style={styles.picture} />}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	cameraContainer: {
		flex: 1,
		flexDirection: "row",
	},
	camera: {
		flex: 1,
		aspectRatio: 1,
	},
	buttonContainer: {
		flex: 1,
		backgroundColor: "transparent",
		flexDirection: "row",
		margin: 20,
	},
	picture: {
		flex: 1,
	},
});
