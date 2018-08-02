import { combineReducers } from 'redux';

import dbReducer from './db.js';
import localReducer from './local.js';
import uiReducer from './ui.js';

const rootReducer = combineReducers({
	db: dbReducer,
	local: localReducer,
	ui: uiReducer
});

export default rootReducer;