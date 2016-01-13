const splitTheWord = (word) => {
	word = word ? word : "hello"
	word = word.toUpperCase();
	let wordArray = word.split(""), newWordArray = [], buffer = "";
	wordArray.map((character) => {
		buffer += character;
		newWordArray.push(buffer);
	});

	return newWordArray;
}

export default function (state = {}, action) {
	let splitWord = splitTheWord(action.word)
	switch (action.type) {
		case 'ADD_ON_SCREEN': 
			return addOnScreen(state, splitWord);
		case 'REMOVE_FROM_SCREEN':
			return removeFromScreen(state, splitWord);
		default: return state;
	}
}

const addOnScreen = (onScreen = {}, splitWord) => {
	splitWord.map((item) => onScreen[item] = onScreen[item] ? onScreen[item] += 1 : 1);
	return onScreen;
}

const removeFromScreen = (onScreen = {}, splitWord) => {
	splitWord.map((item) => onScreen[item] && onScreen[item] === 1 ? delete onScreen[item] : onScreen -= 1)
	return onScreen;
}