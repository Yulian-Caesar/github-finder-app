import { useAlertContext } from "../../context/alert/AlertContext"

export const Alert = () => {
	const { alert: alertState } = useAlertContext();

	return alertState !== null && (
		<div
			className={`grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 gap-8 mb-4`}
			style={{ visibility: alertState ? 'visible' : 'hidden' }}
		>
			<div className='alert alert-error'>
				<svg
					fill='none'
					viewBox='0 0 24 24'
					className='w-6 h-6 stroke-current'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636'
					></path>
				</svg>
				<strong>{alertState.msg}</strong>
			</div>
		</div>
	)
}
