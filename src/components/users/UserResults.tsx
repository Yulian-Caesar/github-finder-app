import { Spinner } from "../layout/Spinner";
import { UserItem } from "./UserItem";
import {useGithubContext} from "../../context/github/GithubContext";

export const UserResults = () => {
	const {users, isLoading} = useGithubContext();

	return (
		isLoading ? <Spinner /> : (
			<div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
				{users && users.map(user => (
					<UserItem key={user.id} user={user} />
				))}
			</div>
		)

	)
}
