import React from 'react';

const authContext = React.createContext('auth');
export const AuthProvider = authContext.Provider;

export default (Component) => {
    return (props) => {
        return (
            <authContext.Consumer>
                {auth => <Component {...props} auth={auth} />}
            </authContext.Consumer>
        );
    }
}