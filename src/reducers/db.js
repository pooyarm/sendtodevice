import { combineReducers } from 'redux';

const mock_reducer = (mock = {}, action) => {
	return mock;
};

const dbReducer = combineReducers({
    mock: mock_reducer
});

export default dbReducer;