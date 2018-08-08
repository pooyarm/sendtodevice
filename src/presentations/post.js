import React, { Component } from 'react';

import { Paper, Button, Typography, TextField } from '@material-ui/core';

class PostPresentation extends Component {
    state = {
        value: ''
    };

    handleChange(event) {
        this.setState({
            'value': event.target.value,
        });
    }

	render() {
        return (
            <Paper className='margin-vertical-50 padding-20'>
                <TextField
                    id="multiline-flexible"
                    label="Multiline"
                    multiline
                    rowsMax="4"
                    value={this.state.value}
                    onChange={this.handleChange.bind(this)}
                    className=''
                    margin="normal"
                />
                <div className="flex flex-column flex-center-items">
                    <Button variant="contained" color="primary" onClick={()=> {this.props.sendHandler(this.state.value)}}>Send</Button>
                </div>
            </Paper>
        );
	}
}

export default PostPresentation;