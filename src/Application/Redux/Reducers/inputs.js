const SET_INPUT = 'inputs/setInput';

export default (state = {}, action) => {
	switch (action.type) {
		case SET_INPUT:
			let data = { ...state };
			data[action.payload.name] = action.payload.value;
			return { ...data };
		default:
			return state;
	}
};

const setInput = payload => {
	return {
		type: SET_INPUT,
		payload: {
			value: payload.value,
			name: payload.name
		}
	};
};

export { setInput };
