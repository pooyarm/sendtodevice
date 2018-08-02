import {
	createStore,
	compose
} from 'redux';

import firebase from 'firebase';
import firebaseConfig from './firebase.conf.js';
import { reactReduxFirebase } from 'react-redux-firebase';

firebase.initializeApp(firebaseConfig);

const rrfConfig = {
};

export const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
)(createStore);