import { combineReducers } from 'redux';

const user_reducer = (user = {}, action) => {
	return user;
};

const localReducer = combineReducers({
    user: user_reducer
});

export default localReducer;