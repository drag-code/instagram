import * as firebase from "firebase";
import "firebase/firestore";
import {
	API_KEY,
	AUTH_DOMAIN,
	PROJECT_ID,
	STORAGE_BUCKET,
	MESSAGING_SENDER_ID,
	APP_ID,
	MEASUREMENT_ID,
} from "@env";

console.log(APP_ID);
const initFirebase = () => {
	const firebaseConfig = {
		apiKey: "AIzaSyBQYcCE3ZEV-ZM3C9Ry3ZgvDX1hZko3oNQ",
		authDomain: "instagram-df395.firebaseapp.com",
		projectId: "instagram-df395",
		storageBucket: "instagram-df395.appspot.com",
		messagingSenderId: "92280040536",
		appId: "1:92280040536:web:a0ff04537dda1ba64dee2d",
		measurementId: "G-R38GFWHRL5",
	};
	// Initialize Firebase
	if (firebase.apps.length === 0) {
		firebase.initializeApp(firebaseConfig);
		//firebase.analytics();
	}

	return firebase;
};

export default initFirebase;
