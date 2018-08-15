import {connect} from 'react-redux';

import { getFirebase } from 'react-redux-firebase';

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

export default connect(mapStateToProps, mapDispatchToProps);