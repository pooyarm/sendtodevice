import React, { Component } from 'react';
import { compose } from 'redux';
import {connect} from 'react-redux';

import { getFirebase } from 'react-redux-firebase';
import { firestoreConnect } from 'react-redux-firebase'

import withAuth from '../utils/withAuth';
import { CircularProgress } from '@material-ui/core';
import ListPresentation from '../presentations/list';

const ListContainer = ({items, isLoading, deleteAction}) => {
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
        return <ListPresentation items={items} deleteHandler={deleteAction} />
    }

}

const itemsKey = (auth) => `users/${auth.uid}/items`;

const mapStateToProps = (state, {auth}) => {
	return {
        items: state.firestore.ordered[itemsKey(auth)],
        isLoading: state.firestore.status.requesting[itemsKey(auth)]
	}
}

const mapDispatchToProps = (dispatch, {auth,firebase ,firestore}) => {
    var firebaseApi = getFirebase();
	return {
        deleteAction: (id) => {
            firestore.delete({ collection: itemsKey(auth), doc: id });
        }
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