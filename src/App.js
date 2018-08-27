import React, { Component } from 'react';
import {connect} from 'react-redux';

import { getFirebase } from 'react-redux-firebase';
import HeaderPresentation from './presentations/header.js';
import PostForm from './containers/post.js';
import List from './containers/list.js';

import withAuth from './utils/withAuth';
import { compose } from 'redux';

class App extends Component {
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
        }
    }
}

export default compose(
    withAuth,
    connect(mapStateToProps, mapDispatchToProps)
)(App);