import { splitTheWord } from "../utils/utils"

let defaultState = {
		onScreen: {},
		typed: {
			none: []
		}
	}

export default function (state = defaultState, action) {
	switch (action.type) {
		case 'ADD_USER':
			return {
				onScreen: state.onScreen,
				typed: addUser(state.typed, action.username)
			}
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
		case 'COMPLETED_WORD':
			return {
				onScreen: removeFromScreen(state.onScreen, action.word),
				typed: completedWord(state.typed, action.word, action.username)
			}
		default: return state;
	}
}

const completedWord = (typed, word, username = "none") => {
	if(typed[username]) {
		return Object.assign(typed, {
			[username]: [...typed[username], word]
		});
	} else {
		return typed;
	}
}

const addUser = (typed, username) => {
	return Object.assign(typed, {
		[username]: []
	});
}

const addOnScreen = (onScreen = {}, word) => {
	let splitWord = {};
	splitTheWord(word).map((item) => {splitWord[item] = 1})
	return Object.assign(onScreen, {
		[word]:splitWord
	});
}

const removeFromScreen = (onScreen = {}, word) => {
	let onScreenTemp = onScreen;
	 delete onScreenTemp[Object.keys(onScreen).filter((item) => item == word)]
	 return onScreenTemp;
}
