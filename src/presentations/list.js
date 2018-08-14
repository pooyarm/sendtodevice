import React, { Component } from 'react';
import ItemPresentation from './item';
import { Grid } from '@material-ui/core';

class ListPresentation extends Component {
	render() {
        return (
            <div className='App-list'>
                <Grid container spacing={24} alignItems='center'>
                    {this.props.items.map((item) => <ItemPresentation deleteHandler={this.props.deleteHandler} key={item.id} {...item} />)}
                </Grid>
            </div>
        );
	}
}

export default ListPresentation;