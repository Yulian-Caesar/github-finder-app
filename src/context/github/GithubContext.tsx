import { createContext, ReactNode, useContext, useReducer } from "react";
import { GithubAction, githubReducer } from "./GithubReducer";
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
	users: UserType[] | null,
	user: UserType | null,
	repos: RepoType[] | [],
	isLoading: boolean,
	dispatch: React.Dispatch<GithubAction>;
};

const GithubContext = createContext<GithubContextType | undefined>(undefined);


const GithubProvider = ({ children }: { children: ReactNode }) => {

	const initialState = {
		users: [],
		user: null,
		repos: [],
		isLoading: false
	}

	const [state, dispatch] = useReducer(githubReducer, initialState)

	return <GithubContext.Provider value={{
		...state,
		dispatch
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