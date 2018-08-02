import { combineReducers } from 'redux';

import { firebaseReducer } from 'react-redux-firebase';

import dbReducer from './db.js';
import localReducer from './local.js';
import uiReducer from './ui.js';

const rootReducer = combineReducers({
	db: dbReducer,
	local: localReducer,
	ui: uiReducer,
	firebase: firebaseReducer
});

export default rootReducer;