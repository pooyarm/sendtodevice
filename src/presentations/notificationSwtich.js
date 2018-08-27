import React, { Component } from 'react';

import { FormControlLabel, Switch } from '@material-ui/core';

export default class NotificationSwitchPresentation extends Component {
    state = {
        checked: false
    };

    handleChange = event => {
        this.setState({ checked: event.target.checked });
        if (event.target.checked)
            this.props.onEnable();
        else
            this.props.onDisable();
    };

	render() {
        console.log('this.state.checked',this.state.checked);
        return (
            <FormControlLabel
                disabled={this.props.disabled}
                control={
                <Switch
                    checked={this.props.enable}
                    onChange={this.handleChange.bind(this)}
                    color="secondary"
                />
                }
                label="Notification"
            />
        );
	}
}