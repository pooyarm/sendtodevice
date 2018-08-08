import React, { Component } from 'react';

import { AppBar, MenuItem, Menu, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import withAuth from '../utils/withAuth';

class HeaderPresentation extends Component {
    state = {
        anchorEl: null,
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

	render() {
        const open = Boolean(this.state.anchorEl);

        return (
            <AppBar position="static">
                <Toolbar className='flex'>
                    <Typography variant="title" color="inherit" className="flex-grow-1" >
                        Send To Device
                    </Typography>
                    <div>
                        <IconButton
                            aria-owns={open ? 'menu-appbar' : null}
                            aria-haspopup="true"
                            onClick={this.handleMenu}
                            color="inherit"
                        >
                            <Avatar alt={this.props.auth.displayName} src={this.props.auth.photoURL} />
                        </IconButton>
                        <Menu
                            id="user-menu"
                            anchorEl={this.state.anchorEl}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            open={open}
                            onClose={this.handleClose}
                        >
                            <MenuItem 
                                onClick={this.props.handleLogout}
                                >Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        );
	}
}

export default withAuth(HeaderPresentation);