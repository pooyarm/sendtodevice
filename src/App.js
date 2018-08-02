import React, { Component } from 'react';
import {connect} from 'react-redux';

import { Button, Typography } from '@material-ui/core';
import withRoot from './styles/theme.js';

class App extends Component {
  render() {
    console.log('this.props', this.props);
    return (
      <div className="App">
        <Typography variant="display1" gutterBottom>Welcome to React</Typography>
        <Typography variant="display2" gutterBottom>
          To get started, edit <code>src/App.js</code> and save to reload.
        </Typography>
        <Button variant="contained" color="primary">Is this a Button?</Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state',state);
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRoot(
    App
  )
);
