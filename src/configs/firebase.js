import {
	createStore,
	compose
} from 'redux';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/messaging';

import firebaseConfig from './firebase.conf.js';
import { reactReduxFirebase } from 'react-redux-firebase';
import { reduxFirestore } from 'redux-firestore'

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

firebase.messaging().usePublicVapidKey(firebaseConfig.publicVapidKey);

const rrfConfig = {
    userProfile: 'profile',
    useFirestoreForProfile: true
};

export const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);