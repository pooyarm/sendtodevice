import React, { Component } from 'react';
import {connect} from 'react-redux';

import { Typography, CircularProgress } from '@material-ui/core';
import withRoot from './styles/theme.js';
import { getFirebase } from 'react-redux-firebase';
import LoginPresentation from './presentations/login.js';
import App from './App.js';
import { AuthProvider } from './utils/withAuth.js';

class AuthSwitcher extends Component {
	render() {
        if (!this.props.auth.isLoaded) {
            return (
                <div className='flex flex-column flex-center-items margin-vertical-50'>
                    <CircularProgress
                        size={80}
                    />
                </div>
            )
        } else if (this.props.auth.isEmpty) {
            return (
                <LoginPresentation loginHandler={this.props.login} />
            )
        } else {
            return (
                <AuthProvider value={this.props.auth}>
				    <App />
                </AuthProvider>
            )
        }
	}
}

const mapStateToProps = (state) => {
	return {
        auth: state.firebase.auth
	}
}

const mapDispatchToProps = (dispatch) => {
    var firebaseApi = getFirebase();
	return {
        login: () => {
            return firebaseApi.login({
                provider: 'google',
                type: 'redirect'
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
	withRoot(
		AuthSwitcher
	)
);
