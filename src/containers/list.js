import React, { Component } from 'react';
import { compose } from 'redux';
import {connect} from 'react-redux';

import { getFirebase } from 'react-redux-firebase';
import { firestoreConnect } from 'react-redux-firebase'

import withAuth from '../utils/withAuth';
import { CircularProgress } from '@material-ui/core';
import ListPresentation from '../presentations/list';

const ListContainer = ({items, isLoading}) => {
    if (isLoading) {
        return (
            <div className='flex flex-column flex-center-items margin-vertical-50'>
                <CircularProgress
                    size={40}
                />
            </div>
        )
    } else if (!items) {
        return null;
    } else {
        console.log('items', items);
        return <ListPresentation items={items} />
    }

}

const itemsKey = (auth) => `users/${auth.uid}/items`;

const mapStateToProps = (state, {auth}) => {
	return {
        items: state.firestore.ordered[itemsKey(auth)],
        isLoading: state.firestore.status.requesting[itemsKey(auth)]
	}
}

const mapDispatchToProps = (dispatch, {auth}) => {
    var firebaseApi = getFirebase();
	return {
    }
}

export default compose(
    withAuth,
    firestoreConnect(({auth}) => [
        {
            collection: itemsKey(auth),
            orderBy: ['createDate', 'desc'],
        }
    ]),
    connect(mapStateToProps, mapDispatchToProps)
)(ListContainer);