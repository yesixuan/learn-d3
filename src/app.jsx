import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { syncAction } from './model/action';

import './css/main.scss'; // import global css style
import './app.scss';

/* class App extends Component {
  render() {
    const { dispatch, appState: { data } } = this.props;
    return (
      // App root node
      <div>
          <Link to="/about">About</Link>
          <Link to="/user">User</Link>
      </div>
    );
  }
} */

function App() {
  // const { dispatch, appState: { data } } = props;
  const containerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-around',
  };
  const linkStyle = {
    flexFrow: '0',
    textDecoration: 'none',
    textAlign: 'center',
    color: '#000',
    background: '#ccc',
    padding: '4px 5px',
    borderRadius: '6px',
  };
  return (
    <div style={containerStyle}>
      <Link style={linkStyle} to="/line-chart" href="/">折线图</Link>
      <Link style={linkStyle} to="/histogram" href="/">直方图</Link>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    appState: state.appState,
  };
}

export default connect(mapStateToProps)(App);
