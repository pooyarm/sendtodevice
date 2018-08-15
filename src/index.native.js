import React, {Component} from 'react';

import AuthSwitcher from './AuthSwitcher.native.js';
import { Provider } from 'react-redux';
import store from './store.js';

export default class App extends Component {
    render() {
      return (
        <Provider store={store}>
            <AuthSwitcher />
        </Provider>
      );
    }
}