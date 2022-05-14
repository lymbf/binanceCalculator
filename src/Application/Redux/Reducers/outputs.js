const SET_OUTPUT = 'outputs/setOutput';

export default (state = {}, action) => {
	switch (action.type) {
		case SET_OUTPUT:
			let data = { ...state };
			data[action.payload.name] = action.payload.value;
			return { ...data };
		default:
			return state;
	}
};

const setOutput = payload => {
	return {
		type: SET_OUTPUT,
		payload: {
			value: payload.value,
			name: payload.name
		}
	};
};

export { setOutput };
