import {
	applyMiddleware
} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { getFirebase } from 'react-redux-firebase';
import { createStoreWithFirebase } from './configs/firebase.js';

import rootReducer from './reducers/index.js';
import mockMiddleware from './middlewares/mock.js';

let base_structure = {
};

const enhancer = applyMiddleware(
	logger,
	thunk.withExtraArgument(getFirebase),
	mockMiddleware
);

const store = createStoreWithFirebase(
	rootReducer,
	base_structure,
    enhancer
);

export default store;