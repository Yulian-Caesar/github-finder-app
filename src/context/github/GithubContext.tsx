import { createContext, ReactNode, useContext, useReducer } from "react";
import { githubReducer } from "./GithubReducer";

export type User = {
	id: number | string;
	login: string;
	avatar_url: string;
}

type GithubContextType = {
	users: User[],
	isLoading: boolean,
	searchUsers: (text: string) => void
	clearUsers: () => void
};

const GithubContext = createContext<GithubContextType | undefined>(undefined);

const GITHUB_URL = import.meta.env.VITE_GITHUB_URL;

export const GithubProvider = ({ children }: { children: ReactNode }) => {
	const initialState = {
		users: [],
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
				throw new Error(`Error: ${res.status} ${res.statusText}`);
			}
			const { items } = await res.json();
			dispatch({
				type: 'GET_USERS',
				payload: items
			})
		} catch (error) {
			console.log(error)
		}

		
	}

	const setLoading = () => dispatch({ type: 'SET_LOADING' })
	const clearUsers = () => dispatch({ type: 'CLEAR_USERS' })

	return <GithubContext.Provider value={{
		users: state.users,
		isLoading: state.isLoading,
		searchUsers,
		clearUsers
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