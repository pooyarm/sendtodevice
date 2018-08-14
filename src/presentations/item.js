import React, { Component } from 'react';
import moment from 'moment';
import {Card, CardContent, Typography, Grid, IconButton, CardActions, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { DATE_FORMAT } from '../constants/general';
import { nl2br } from '../utils/general';

class ItemPresentation extends Component {
    state = {
        deleteConfirm: false,
    };

    openDeleteConfirm = () => {
        this.setState({ deleteConfirm: true });
    }
    
    closeDeleteConfirm = () => {
        this.setState({ deleteConfirm: false });
    }

    delete() {
        this.closeDeleteConfirm();
        this.props.deleteHandler(this.props.id)
    }

	render() {
        var momentText = moment(this.props.createDate).format(DATE_FORMAT);
        var bodyText = nl2br(this.props.text);
        return (
            <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                <Card className={'App-list-item'}>
                    <CardContent>
                        <Typography variant="title" component="h2">
                            {bodyText}
                        </Typography>
                        <br/>
                        <Typography variant="caption">
                            {momentText}
                        </Typography>
                    </CardContent>
                    <CardActions disableActionSpacing>
                        <div style={{marginLeft: 'auto'}}>
                            <IconButton onClick={this.openDeleteConfirm.bind(this)} aria-label="Delete">
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </CardActions>
                </Card>
                <Dialog
                    open={this.state.deleteConfirm}
                    onClose={this.closeDeleteConfirm.bind(this)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Do you want to remove this item? This action can't be undone.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeDeleteConfirm.bind(this)} color="primary">
                            No
                        </Button>
                        <Button onClick={this.delete.bind(this)} color="primary">
                            Yes, do it
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        );
	}
}

export default ItemPresentation;