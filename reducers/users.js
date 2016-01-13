let defaultState = {
	user_a: "",
	user_b: ""
}

export default function (state = defaultState, action) {
	switch (action.type) {
		case 'ADD_USER': 
			if (state.user_a == "") {
				return {
				user_a: action.username,
				user_b: state.user_b
				}
			} else if (state.user_b == "") {
				return {
				user_a: state.user_a,
				user_b: action.username
				}
			}
		default: return state;
	}
}