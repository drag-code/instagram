import { USER_ACTIONS } from "../constants/index";

const initialState = {
	currentUser: null,
	posts: [],
};

export const user = (state = initialState, action) => {
	switch (action.type) {
		case USER_ACTIONS.USER_STATE_CHANGED:
			return {
				...state,
				currentUser: action.currentUser,
			};
            
		case USER_ACTIONS.USER_POSTS_STATE_CHANGED:
			return {
				...state,
				posts: action.posts,
			};

		default:
			return state;
	}
};
