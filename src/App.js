import React, { Component } from 'react';
import {connect} from 'react-redux';

import { getFirebase } from 'react-redux-firebase';
import HeaderPresentation from './presentations/header.js';
import PostForm from './containers/post.js';
import List from './containers/list.js';

import {AuthProvider} from './utils/withAuth';

class App extends Component {
	render() {
        return (
            <AuthProvider value={this.props.auth}>
                <div className='App'>
                    <div>
                        <HeaderPresentation handleLogout={this.props.handleLogout} />
                    </div>
                    <div className='App-container'>
                        <PostForm />
                        <List />
                    </div>
                </div>
            </AuthProvider>
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