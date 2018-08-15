import React, { Component } from 'react';

import { CircularProgress } from '@material-ui/core';
import withRoot from './styles/theme.js';
import LoginPresentation from './presentations/login.js';
import App from './App.js';

import AuthSwitcherCreator from './AuthSwitcher.js';

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
				<App />
            )
        }
	}
}

export default AuthSwitcherCreator(
	withRoot(
		AuthSwitcher
	)
);
