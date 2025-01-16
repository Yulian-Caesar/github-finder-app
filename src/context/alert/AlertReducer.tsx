
export type AlertState = {
	msg: string;
	type: string;
} | null;

type AlertAction = 
	| { type: 'SET_ALERT'; payload: { msg: string; type: string } }
	| { type: 'REMOVE_ALERT' };

export const alertReducer = (state: AlertState, action: AlertAction) => {

	switch(action.type) {
		case 'SET_ALERT': 
			return { msg: action.payload.msg, type: action.payload.type };
		case 'REMOVE_ALERT':
			return null
		default:
			return state
	}
}