export default function (state = {}, action) {
	switch (action.type) {
		case 'ADD_USER':
		case 'REMOVE_FROM_BUFFER':
			return Object.assign(state, {
				[action.username]: ""
			});
		case 'ADD_CHARACTER':
			return addCharacter(state, action.username, action.character);
		default: return state;
	}
}

const addCharacter = (state, username, character) => {
	if (typeof state[username] !== "undefined") {
		return Object.assign(state, {
			[username]: state[username] + character
		});
	} else {
		return state;
	}
}
