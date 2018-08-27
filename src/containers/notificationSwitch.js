import React, { Component } from 'react';
import { compose } from 'redux';
import {connect} from 'react-redux';

import { firestoreConnect } from 'react-redux-firebase'

import firebase from 'firebase/app';
import 'firebase/messaging';

import withAuth from '../utils/withAuth';
import NotificationSwitchPresentation from '../presentations/notificationSwtich';
import { set_local_token, set_enable_notification } from '../actions/local';

class NotificationSwitchContainer extends Component {
    tokenInitiated = false;

    componentDidMount() {
        if (!this.props.isLoading && !this.tokenInitiated) {
            this.initToken();
        }
    }

    componentDidUpdate() {
        if (!this.props.isLoading && !this.tokenInitiated) {
            this.initToken();
        }
    }

    isTokenRegistred(currentToken) {
        for (var token of this.props.tokens) {
            if (token.token == currentToken) return token.id;
        }
        return false;
    }

    getToken() {
        const messaging = firebase.messaging();
        messaging.getToken().then(function(currentToken) {
            console.log('currentToken', currentToken);
            if (currentToken) {
                if (!this.isTokenRegistred(currentToken)) {
                    this.props.addToken(currentToken);
                } else {
                    console.log('Token already registred');
                }
            } else {
                // Show permission request.
                console.log('No Instance ID token available. Request permission to generate one.');
            }
        }.bind(this)).catch(function(err) {
            console.log('An error occurred while retrieving token. ', err);
        });
    }

    initToken(force = false) {
        this.tokenInitiated = true;
        console.log('this.props.isNotificationEnable',this.props.isNotificationEnable);
        if (!this.props.isNotificationEnable && !force) return true;

        const messaging = firebase.messaging();
        messaging.requestPermission().then(function() {
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

    enableNotification() {
        this.props.setEnableNotification(true);
        this.initToken(true);
    }

    disableNotification() {
        this.props.setEnableNotification(false);
        this.props.removeToken(this.isTokenRegistred(this.props.lastToken));
    }

    render() {
        console.log('tokens',this.props.tokens);
        console.log('lastToken', this.props.lastToken);
        return <NotificationSwitchPresentation
            disabled={this.props.isLoading}
            enable={Boolean(this.props.isNotificationEnable)}
            onEnable={this.enableNotification.bind(this)}
            onDisable={this.disableNotification.bind(this)}
        />;
    }
}

const itemsKey = (auth) => `users/${auth.uid}/tokens`;

const mapStateToProps = (state, {auth}) => {
	return {
        tokens: state.firestore.ordered[itemsKey(auth)],
        isLoading: state.firestore.status.requesting[itemsKey(auth)],
        lastToken: state.local.lastToken,
        isNotificationEnable: parseInt(state.local.isNotificationEnable)
	}
}

const mapDispatchToProps = (dispatch, {auth,firebase ,firestore}) => {
    return {
        addToken: (token) => {
            firestore.add({ collection: itemsKey(auth) }, {
                token
            });
            dispatch(set_local_token(token));
        },
        setEnableNotification: (flag) => {
            dispatch(set_enable_notification(flag));
        },
        removeToken: (tokenID) => {
            firestore.delete({
                collection: itemsKey(auth),
                doc: tokenID
            });
            dispatch(set_local_token(null));
        }
    }
}

export default compose(
    withAuth,
    firestoreConnect(({auth}) => [
        {
            collection: itemsKey(auth)
        }
    ]),
    connect(mapStateToProps, mapDispatchToProps)
)(NotificationSwitchContainer);