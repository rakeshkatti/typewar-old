export default function (state = [], action) {
    switch (action.type) {
        case 'ADD_USER':
            return addUser(state, action.username);
        default:
            return state;
    }
}

const addUser = (state, username) => {
    state = state.filter((item) => item !== username);
    return [
        ...state,
        username
    ]
}
