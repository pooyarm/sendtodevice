import React, { Component } from 'react';

import {Card, CardContent, Typography, Grid} from '@material-ui/core';

class ItemPresentation extends Component {
	render() {
        return (
            <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                <Card className={'App-list-item'}>
                    <CardContent>
                        <Typography variant="title" component="h2">
                            {this.props.text}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
	}
}

export default ItemPresentation;