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
    tokenInitiated = false;

    componentDidMount() {
        console.log('this.props.profile',this.props.profile);

        if (this.props.profile.isLoaded && !this.tokenInitiated) {
            this.initToken();
        }
    }

    getToken() {
        var lastToken = localStorage.getItem('lastToken');
        const messaging = firebase.messaging();
        messaging.getToken().then(function(currentToken) {
            console.log('currentToken', currentToken);
            if (currentToken) {
                this.props.setToken(currentToken, lastToken, this.props.profile.tokens);
                localStorage.setItem('lastToken', currentToken);
            } else {
                // Show permission request.
                console.log('No Instance ID token available. Request permission to generate one.');
            }
        }.bind(this)).catch(function(err) {
            console.log('An error occurred while retrieving token. ', err);
        });
    }

    initToken() {
        this.tokenInitiated = true;
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

        messaging.onMessage((payload) => {
            console.log('onMessage', payload);
        });
    }

    componentDidUpdate() {
        console.log('this.props.profile',this.props.profile);

        if (this.props.profile.isLoaded && !this.tokenInitiated) {
            this.initToken();
        }
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
        profile: state.firebase.profile
	}
}

const mapDispatchToProps = (dispatch, {auth}) => {
    var firebaseApi = getFirebase();
    return {
        handleLogout: () => {
            firebaseApi.logout();
        },
        setToken: (newToken, lastToken, currentTokens) => {
            console.log('currentTokens',currentTokens);
            if (Array.isArray(currentTokens)) {
                currentTokens = currentTokens.concat();
            } else {
                currentTokens = [];
            }

            debugger;

            if (currentTokens.indexOf(newToken) > -1) return true;

            if (lastToken) {
                var i = currentTokens.indexOf(lastToken);
                if (i > -1)
                    currentTokens.splice(i, 1);
            }

            currentTokens.push(newToken);
            firebaseApi.updateProfile({ tokens: currentTokens });
        }
    }
}

export default compose(
    withAuth,
    connect(mapStateToProps, mapDispatchToProps)
)(App);