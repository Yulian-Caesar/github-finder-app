import axios from 'axios';
const GITHUB_URL = import.meta.env.VITE_GITHUB_URL;

const github = axios.create({
	baseURL: GITHUB_URL
})

// Get search result
export const searchUsers = async (text: string) => {
	const params = new URLSearchParams({
		q: text
	})
	const response = await github.get(`/search/users?${params}`)
	return response.data.items;
}

// Get user and userRepos
export const getUserAndRepos = async(login: string) => {
	const repoParams = new URLSearchParams({
		sort: 'created',
		per_page: '10'
	})
	const [user, repos] = await Promise.all([
		github.get(`/users/${login}`),
		github.get(`/users/${login}/repos?${repoParams}`),
	])
	return { user: user.data, repos: repos.data}
}
