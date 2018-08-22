import React, { Component } from 'react';
import {connect} from 'react-redux';

import localStorage from 'localStorage';
import firebase from 'firebase/app';
import 'firebase/messaging';

import { getFirebase } from 'react-redux-firebase';
import HeaderPresentation from './presentations/header.js';
import PostForm from './containers/post.js';
import List from './containers/list.js';

import withAuth from './utils/withAuth';
import { compose } from 'redux';

class App extends Component {
    componentDidMount() {
        const messaging = firebase.messaging();
        messaging.requestPermission().then(function() {
            console.log('Notification permission granted.');
            this.getToken();
        }.bind(this)).catch(function(err) {
            console.log('Unable to get permission to notify.', err);
        });

        messaging.onTokenRefresh(function() {
            console.log('token refreshed');
            this.getToken();
        }.bind(this));
    }

    getToken() {
        var lastToken = localStorage.getItem('lastToken');
        const messaging = firebase.messaging();
        messaging.getToken().then(function(currentToken) {
            if (currentToken) {
                if (currentToken != lastToken) {
                    this.props.setToken(currentToken, lastToken);
                    localStorage.setItem('lastToken', currentToken);
                }
            } else {
                // Show permission request.
                console.log('No Instance ID token available. Request permission to generate one.');
            }
        }.bind(this)).catch(function(err) {
            console.log('An error occurred while retrieving token. ', err);
        });
    }

	render() {
        return (
            <div className='App'>
                <div>
                    <HeaderPresentation handleLogout={this.props.handleLogout} />
                </div>
                <div className='App-container'>
                    <PostForm />
                    <List />
                </div>
            </div>
        )
	}
}

const mapStateToProps = (state) => {
	return {
	}
}

const mapDispatchToProps = (dispatch, {auth}) => {
    var firebaseApi = getFirebase();
    return {
        handleLogout: () => {
            firebaseApi.logout();
        },
        setToken: (newToken, lastToken) => {
            var tokens = (auth.tokens)? [...auth.tokens] : [];
            if (lastToken) {
                var i = tokens.indexOf(lastToken);
                tokens.splice(i, 1);
            }
            tokens.push(newToken);
            firebaseApi.updateProfile({ tokens });
        }
    }
}

export default compose(
    withAuth,
    connect(mapStateToProps, mapDispatchToProps)
)(App);