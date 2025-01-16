import { createContext, ReactNode, useContext, useReducer } from "react";
import { githubReducer } from "./GithubReducer";
import { RepoType } from "../../components/repos/RepoItem";

export type UserType = {
	id: number | string;
	login: string;
	avatar_url: string;
	name: string | null;
	type: string;
	location: string | null;
	bio: string | null;
	blog: string | null;
	twitter_username: string | null;
	html_url: string;
	followers: number;
	following: number;
	public_repos: number;
	public_gists: number;
	hireable: boolean;
}

type GithubContextType = {
	users: UserType[],
	user: UserType | null,
	repos: RepoType[] | [],
	isLoading: boolean,
	searchUsers: (text: string) => void
	getUser: (login: string) => void
	clearUsers: () => void
	getRepos: (login: string) => void
};

const GithubContext = createContext<GithubContextType | undefined>(undefined);

const GITHUB_URL = import.meta.env.VITE_GITHUB_URL;

const GithubProvider = ({ children }: { children: ReactNode }) => {

	const initialState = {
		users: [],
		user: null,
		repos: [],
		isLoading: false
	}

	const [state, dispatch] = useReducer(githubReducer, initialState)


	// Get search result
	const searchUsers = async (text: string) => {
		setLoading()
		const params = new URLSearchParams({
			q: text
		})
		try {
			const res = await fetch(`${GITHUB_URL}/search/users?${params}`);
			// add token here??
			if (!res.ok) {
				console.log('comething worng')
				//window.location = '/notfound'
			}
			const { items } = await res.json();
			dispatch({
				type: 'GET_USERS',
				payload: items
			})
		} catch (error) {
			console.log(error)
			//window.location = '/notfound'
		}	
	}

	// Get single user
	const getUser = async (login: string) => {
		setLoading()
		try {
			const res = await fetch(`${GITHUB_URL}/users/${login}`);
			// add token here??
			if (!res.ok) {
				//window.location = '/notfound'
			}
			const data = await res.json();
			dispatch({
				type: 'GET_USER',
				payload: data
			})
		} catch (error) {
			console.log(error)
			//window.location = '/notfound'
		}	
	}

	// Get user repos
	const getRepos = async (login: string) => {
		setLoading()
		const params = new URLSearchParams({
			sort: 'created',
			per_page: '10'
		})
		try {
			const res = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`);
			// add token here??
			if (!res.ok) {
				//window.location = '/notfound'
			}
			const data = await res.json();
			dispatch({
				type: 'GET_REPOS',
				payload: data
			})
		} catch (error) {
			console.log(error)
			//window.location = '/notfound'
		}	
	}

	const setLoading = () => dispatch({ type: 'SET_LOADING' })
	const clearUsers = () => dispatch({ type: 'CLEAR_USERS' })

	return <GithubContext.Provider value={{
		users: state.users,
		isLoading: state.isLoading,
		user: state.user,
		repos: state.repos,
		searchUsers,
		clearUsers,
		getUser,
		getRepos
	}}>
		{children}
	</GithubContext.Provider>
}

export default GithubProvider;

// Custom hook to use the GithubContext
export const useGithubContext = () => {
	const context = useContext(GithubContext);
	if (!context) {
		throw new Error('useGithubContext must be used within a GithubProvider');
	}
	return context;
};