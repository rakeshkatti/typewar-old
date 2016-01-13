let defaultState = {
	a: "",
	b: ""
}

export default function (state = defaultState, action) {
	switch (action.type) {
		case 'TYPED_CHARACTER': 
			return [
				...state,
				{
					a: "",
					b: ""
				}
			];
		default: return state;
	}
}