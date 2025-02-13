import { useState } from 'react'
import { useGithubContext } from '../../context/github/GithubContext';
import { useAlertContext } from '../../context/alert/AlertContext';
import { searchUsers } from '../../context/github/GithubActions'

export const UserSearch = () => {
	const [text, setText] = useState('');
	const {users, dispatch} = useGithubContext();
	const { setAlert } = useAlertContext();
	
	const clearUsers = () => dispatch({ type: 'CLEAR_USERS' })

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value); 

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if(text === '') {
			setAlert('Please enter something', 'error')
		} else {
			dispatch({type: 'SET_LOADING'})
			const users = await searchUsers(text)
			dispatch({
				type: 'GET_USERS',
				payload: users
			})

			setText('')
		}
	}

	return (
		<div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
			<div>
				<form onSubmit={handleSubmit}>
					<div className="form-control">
						<div className="relative">
							<input 
								type="text"
								name='text2'
								className="w-full pr-40 bg-gray-200 input input-lg text-black" 
								placeholder='Search'
								value={text}
								onChange={handleChange}
							/>
							<button 
								type='submit'
								className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg'
							>
								Go
							</button>
						</div>
					</div>
				</form>
			</div>
			{users && users.length > 0 && (
				<div>
					<button onClick={clearUsers} className="btn btn-ghost btn-lg">
						Clear
					</button>
				</div>
			)}
		</div>
	)
}
