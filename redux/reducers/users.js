import { USER_ACTIONS } from "../constants/index";

const initialState = {
	users: [],
	usersLoaded: 0,
};

export const users = (state = initialState, action) => {
	switch (action.type) {
		case USER_ACTIONS.USERS_DATA_STATE_CHANGED:
			return {
				...state,
				users: [...state.users, action.user],
			};

		case USER_ACTIONS.USERS_POSTS_STATE_CHANGED:
			return {
				...state,
				usersLoaded: state.usersLoaded + 1,
				users: state.users.map((user) => {
					if (user.uid === action.uid) {
						return { ...user, posts: action.posts };
					}
					return user;
				}),
			};

		case USER_ACTIONS.CLEAR_USER_DATA:
			return initialState;

		default:
			return state;
	}
};
