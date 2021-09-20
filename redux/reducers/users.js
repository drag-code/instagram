import { USER_ACTIONS } from "../constants/index";

const initialState = {
	users: [],
	followedUsersLoaded: 0,
	feed: [],
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
				followedUsersLoaded: state.followedUsersLoaded + 1,
				feed: [...state.feed, ...action.posts],
			};

		case USER_ACTIONS.USERS_LIKES_STATE_CHANGED:
			return {
				...state,
				feed: state.feed.map((post) =>
					post.id === action.postID
						? { ...post, currentUserLike: action.currentUserLike }
						: post
				),
			};

		case USER_ACTIONS.CLEAR_USER_DATA:
			return initialState;

		default:
			return state;
	}
};
