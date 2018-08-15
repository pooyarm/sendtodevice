import React, { Component } from 'react';

import {View, Text} from 'react-native';

import AuthSwitcherCreator from './AuthSwitcher.js';

class AuthSwitcher extends Component {
	render() {
        if (!this.props.auth.isLoaded) {
            return (
                <View>
                    <Text>Loading</Text>
                </View>
            )
        } else if (this.props.auth.isEmpty) {
            return (
                <View>
                    <Text>Login</Text>
                </View>
            )
        } else {
            return (
                <View>
                    <Text>App</Text>
                </View>
            )
        }
	}
}

export default AuthSwitcherCreator(
	AuthSwitcher
);
