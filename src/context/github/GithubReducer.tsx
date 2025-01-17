import { RepoType } from "../../components/repos/RepoItem";
import { UserType } from "./GithubContext";

type GithubState = {
	users: UserType[];
	user: UserType | null,
	repos: RepoType[],
	isLoading: boolean;
};

export type GithubAction =
	| { type: 'GET_USERS'; payload: [] }
	| { type: 'GET_USER_AND_REPOS'; payload: { user: UserType, repos: RepoType[]} }
	| { type: 'CLEAR_USERS'; }
	| { type: 'SET_LOADING'; }

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
		case 'GET_USER_AND_REPOS': 
			return {
				...state,
				user: action.payload.user,
				repos: action.payload.repos,
				isLoading: false
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
