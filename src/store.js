import {
	createStore,
	applyMiddleware
} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './reducers/index.js';
import mockMiddleware from './middlewares/mock.js';

let base_structure = {
};

const enhancer = applyMiddleware(logger, thunk, mockMiddleware);

const store = createStore(
	rootReducer,
	base_structure,
    enhancer
);

export default store;