import React, { Component } from 'react';
import { compose } from 'redux';
import {connect} from 'react-redux';

import { getFirebase, withFirestore, withFirebase } from 'react-redux-firebase';
import { firestoreConnect } from 'react-redux-firebase'

import PostPresentation from '../presentations/post';
import withAuth from '../utils/withAuth';

const PostForm = (props) => {
    console.log('postform', props);
    return (
        <PostPresentation sendHandler={props.send} />
    )
}

const mapStateToProps = (state) => {
	return {
        auth: state.firebase.auth
	}
}

const mapDispatchToProps = (dispatch, {firestore, auth}) => {
    var firebaseApi = getFirebase();
    console.log('mapDispatchToProps',{firestore, auth});
	return {
        send: (input) => {
            // auth.uid
            console.log('send', input);
            firestore.add({ collection: 'users/' + auth.uid + '/items' }, { text: input });
        }
    }
}

export default compose(
    withAuth,
    withFirestore,
    connect(mapStateToProps, mapDispatchToProps)
)(PostForm);