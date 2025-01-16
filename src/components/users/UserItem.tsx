import { Link } from 'react-router';
import { UserType } from '../../context/github/GithubContext';

type UserItemProps = {
	user: UserType;
};

export const UserItem = ({ user: { login, avatar_url } }: UserItemProps) => {
	return (
		<div className='card shadow-md compact side bg-base-100'>
			<div className="flex-row items-center space-x-4 card-body">
				<div>
					<div className="avatar">
						<div className="rounded-full shadow w-14 h-14">
							<img src={avatar_url} alt="Profile" />
						</div>
					</div>
				</div>
				<div>
					<h2 className="card-title">{login}</h2>
					<Link to={`/user/${login}`} className='text-base-content text-opacity-40'>Visit Profile</Link>
				</div>
			</div>
		</div>
	)
}
