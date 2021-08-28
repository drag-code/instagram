import firebase from "firebase";
import { USER_ACTIONS } from "../constants/index";

export const fetchUser = () => {
	return (dispatch) => {
		firebase
			.firestore()
			.collection("users")
			.doc(firebase.auth().currentUser.uid)
			.get()
			.then((snapshot) => {
				if (snapshot.exists) {
					dispatch({
						type: USER_ACTIONS.USER_STATE_CHANGED,
						currentUser: snapshot.data(),
					});
				} else {
					console.log("Not supported action");
				}
			});
	};
};
