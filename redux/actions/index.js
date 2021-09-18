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

export const fetchPosts = () => {
	return (dispatch) => {
		firebase
			.firestore()
			.collection("posts")
			.doc(firebase.auth().currentUser.uid)
			.collection("userPosts")
			.orderBy("created_at", "asc")
			.get()
			.then((snapshot) => {
				let posts = snapshot.docs.map((post) => {
					const data = post.data();
					const id = post.id;
					return {
						id,
						...data,
					};
				});
				dispatch({
					type: USER_ACTIONS.USER_POSTS_STATE_CHANGED,
					posts,
				});
			});
	};
};

export const fetchFollowedUsers = () => {
	return (dispatch) => {
		firebase
			.firestore()
			.collection("following")
			.doc(firebase.auth().currentUser.uid)
			.collection("followedUsers")
			.onSnapshot((snapshot) => {
				let followedUsers = snapshot.docs.map((user) => {
					const id = user.id;
					return id;
				});
				dispatch({
					type: USER_ACTIONS.USER_FOLLOWED_USERS_STATE_CHANGED,
					followedUsers,
				});
			});
	};
};
