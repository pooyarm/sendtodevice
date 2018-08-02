import React, { Component } from 'react';
import {connect} from 'react-redux';

import { Grid, Paper, Button, Typography } from '@material-ui/core';

class LoginPresentation extends Component {
	render() {
        console.log('this.props', this.props);
        return (
            <Grid container alignItems='center' justify='center'>
                <Grid item xs={10} sm={8} md={4} lg={3} xl={3}>
                    <Paper className='margin-vertical-50 padding-20'>
                        <Typography variant="title" align='center' gutterBottom>Send To Device</Typography>
                        <Typography variant="subheading" align='center' gutterBottom>Login to continue</Typography>
                        <div className="flex flex-column flex-center-items">
                            <Button variant="contained" color="primary" onClick={this.props.loginHandler}>Login with Google</Button>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        );
	}
}

export default LoginPresentation;