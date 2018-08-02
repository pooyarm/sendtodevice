import { combineReducers } from 'redux';

const mock_reducer = (mock = {}, action) => {
	return mock;
};

const uiReducer = combineReducers({
    mock: mock_reducer
});

export default uiReducer;