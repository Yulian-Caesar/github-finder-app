import { createContext, ReactNode, useContext, useReducer } from "react";
import { alertReducer, AlertState } from "./AlertReducer";


type AlertContextType = {
	alert: AlertState;
	setAlert: (msg: string, type: string) => void;
  };

const AlertContext = createContext<AlertContextType | undefined>(undefined);

const AlertProvider = ({children}: { children: ReactNode }) => {
	const initialState = null

	const [state, dispatch] = useReducer(alertReducer, initialState);

	const setAlert = (msg: string, type: string) => {

		dispatch({
			type: 'SET_ALERT',
			payload: { msg, type }
		});
	

		setTimeout(() => {
			dispatch({
				type: 'REMOVE_ALERT'
			})
		}, 3000)
	}

	return <AlertContext.Provider value={{
		alert: state,
		setAlert
	}}>
		{children}
	</AlertContext.Provider>
}

export default AlertProvider;

// Custom hook to use the AlertContext
export const useAlertContext = () => {
	const context = useContext(AlertContext);
	if (!context) {
		throw new Error('useGithubContext must be used within a GithubProvider');
	}
	return context;
};