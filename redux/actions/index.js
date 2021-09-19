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
				for (let index = 0; index < followedUsers.length; index++) {
					dispatch(fetchUsersData(followedUsers[index]));
					
				}
			});
	};
};

export const fetchUsersData = (uid) => {
	return (dispatch, getState) => {
		const found = getState().usersState.users.some((user) => user.uid === uid);
		if (!found) {
			firebase
				.firestore()
				.collection("users")
				.doc(uid)
				.get()
				.then((snapshot) => {
					if (snapshot.exists) {
						const user = snapshot.data();
						user.uid = snapshot.id;
						dispatch({
							type: USER_ACTIONS.USERS_DATA_STATE_CHANGED,
							user,
						});
						dispatch(fetchFollowedUsersPosts(user.uid));
					} else {
						console.log("Not supported action");
					}
				});
		}
	};
};

export const fetchFollowedUsersPosts = (uid) => {
	return (dispatch, getState) => {
		firebase
			.firestore()
			.collection("posts")
			.doc(uid)
			.collection("userPosts")
			.orderBy("created_at", "asc")
			.get()
			.then((snapshot) => {
				const uid = snapshot.docs[0].ref.path.split('/')[1];
				const user = getState().usersState.users.find((user) => user.uid === uid);
				let posts = snapshot.docs.map((post) => {
					const data = post.data();
					const id = post.id;
					return {
						id,
						...data,
						user
					};
				});
				dispatch({
					type: USER_ACTIONS.USERS_POSTS_STATE_CHANGED,
					posts,
					uid
				});
			});
	};
};
