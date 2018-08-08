import { combineReducers } from 'redux';

import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore'

import dbReducer from './db.js';
import localReducer from './local.js';
import uiReducer from './ui.js';

const rootReducer = combineReducers({
	db: dbReducer,
	local: localReducer,
	ui: uiReducer,
	firebase: firebaseReducer,
	firestore: firestoreReducer
});

export default rootReducer;