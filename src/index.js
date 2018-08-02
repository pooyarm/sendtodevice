import React from 'react';
import ReactDOM from 'react-dom';

import AuthSwitcher from './AuthSwitcher';
import { Provider } from 'react-redux';
import store from './store.js';

import registerServiceWorker from './registerServiceWorker';

import './styles/index.css';


ReactDOM.render((
    <Provider store={store}>
        <AuthSwitcher />
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
