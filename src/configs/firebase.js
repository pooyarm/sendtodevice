import {
	createStore,
	compose
} from 'redux';

import firebase from 'firebase';
import 'firebase/firestore';

import firebaseConfig from './firebase.conf.js';
import { reactReduxFirebase } from 'react-redux-firebase';
import { reduxFirestore } from 'redux-firestore'

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

const rrfConfig = {
    userProfile: 'profile'
};

export const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);