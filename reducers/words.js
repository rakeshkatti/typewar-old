let defaultState = {
		onScreen: [],
		typed: {
			user_a: [],
			user_b: [],
			none: []
		}
	}

export default function (state = defaultState, action) {
	switch (action.type) {
		case 'ADD_ON_SCREEN': 
			return {
					onScreen: addOnScreen(state.onScreen, action.word),
					typed: state.typed
				};
		case 'REMOVE_FROM_SCREEN':
			return {
					onScreen: removeFromScreen(state.onScreen, action.word),
					typed: state.typed
				};
		default: return state;
	}
}

const addOnScreen = (onScreen = [], word) => {
	return [...onScreen, word];
}

const removeFromScreen = (onScreen = [], word) => {
	return onScreen.filter((item) => item !== word)
}