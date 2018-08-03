import React, { Component } from 'react';
import {connect} from 'react-redux';

import { Typography, CircularProgress } from '@material-ui/core';
import withRoot from './styles/theme.js';
import { getFirebase } from 'react-redux-firebase';
import LoginPresentation from './presentations/login.js';
import HeaderPresentation from './presentations/header.js';

class App extends Component {
	render() {
        return (
            <div class='App'>
                <HeaderPresentation
                    auth={this.props.auth}
                    handleLogout={this.props.handleLogout} />
                <Typography variant="display3" gutterBottom>Welcome {this.props.auth.displayName} !</Typography>
            </div>
        )
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
        handleLogout: () => {
            firebaseApi.logout();
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);