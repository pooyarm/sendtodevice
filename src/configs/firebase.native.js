import { compose, createStore } from 'redux';
import RNFirebase from 'react-native-firebase';
import { reactReduxFirebase } from 'react-redux-firebase';
import { reduxFirestore } from 'redux-firestore';

const reactNativeFirebaseConfig = {
    debug: true
};

const reduxFirebaseConfig = {
    userProfile: 'users', // save users profiles to 'users' collection
};

const firebase = RNFirebase.app(); //.initializeApp(reactNativeFirebaseConfig);

export const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, reduxFirebaseConfig),
    reduxFirestore(firebase)
)(createStore);