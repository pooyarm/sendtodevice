import React, { Component } from 'react';

import { Paper, Button, Grid, TextField } from '@material-ui/core';

class PostPresentation extends Component {
    state = {
        value: ''
    };

    handleChange(event) {
        this.setState({
            'value': event.target.value,
        });
    }

    onClick() {
        this.props.sendHandler(this.state.value);
        this.setState({value: ''});
    }

	render() {
        return (
            <div className='App-post'>
                <Paper className='margin-vertical-50 padding-20'>
                    <Grid container spacing={16}>
                        <Grid item xs={12}>
                            <TextField
                                id="multiline-flexible"
                                label="What you want to send?"
                                fullWidth={true}
                                multiline
                                rowsMax="4"
                                rows="3"
                                margin="none"
                                value={this.state.value}
                                onChange={this.handleChange.bind(this)}
                            />
                        </Grid>
                        <Grid item
                            xs={12}>
                            <Grid
                                container
                                alignItems="flex-end"
                                direction="column">
                                <Grid item >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.onClick.bind(this)}>Send</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
	}
}

export default PostPresentation;