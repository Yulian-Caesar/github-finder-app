import { User } from "./GithubContext";

type GithubState = {
	users: User[];
	isLoading: boolean;
};

type GithubAction =
	| { type: 'GET_USERS'; payload: [] }
	| { type: 'CLEAR_USERS'; }
	| { type: 'SET_LOADING' }

export const githubReducer = (state: GithubState, action: GithubAction): GithubState => {
	
	switch (action.type) {
		case 'GET_USERS':
			return {
				...state,
				users: action.payload,
				isLoading: false
			}
		case 'CLEAR_USERS':
			return {
				...state,
				users: []
			}
		case 'SET_LOADING': 
			return {
				...state,
				isLoading: true
			}
		default:
			return state;
	}
}
