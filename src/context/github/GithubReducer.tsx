import { RepoType } from "../../components/repos/RepoItem";
import { UserType } from "./GithubContext";

type GithubState = {
	users: UserType[];
	user: UserType | null,
	repos: RepoType[],
	isLoading: boolean;
};

type GithubAction =
	| { type: 'GET_USERS'; payload: [] }
	| { type: 'GET_USER'; payload: UserType | null }
	| { type: 'GET_REPOS'; payload: RepoType[] }
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
		case 'GET_USER':
			return {
				...state,
				user: action.payload,
				isLoading: false
			}
		case 'CLEAR_USERS':
			return {
				...state,
				users: []
			}
		case 'GET_REPOS': 
			return {
				...state,
				repos: action.payload,
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
