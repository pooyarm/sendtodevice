import React, { Component } from 'react';
import moment from 'moment';
import {Card, CardContent, Typography, Grid} from '@material-ui/core';
import { DATE_FORMAT } from '../constants/general';
import { nl2br } from '../utils/general';

class ItemPresentation extends Component {
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
                </Card>
            </Grid>
        );
	}
}

export default ItemPresentation;