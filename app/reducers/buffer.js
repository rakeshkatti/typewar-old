import {splitTheWord} from "../utils/utils"

export default function (state = {}, action) {
    switch (action.type) {
        case 'ADD_USER':
        case 'REMOVE_FROM_BUFFER':
            return Object.assign(state, {
                [action.username]: {
                    word: "",
                    letters: {}
                }
            });
        case 'ADD_CHARACTER':
            return addCharacter(state, action.username, action.character);
        default:
            return state;
    }
}

const addCharacter = (state, username, character) => {
    let word = state[username].word + character;
    let letters = {}
    splitTheWord(word).map((item) => letters[item] = 1);

    if (typeof state[username] !== "undefined") {
        return Object.assign(state, {
            [username]: {
                word: word,
                letters: letters
            }
        });
    } else {
        return state;
    }
}
