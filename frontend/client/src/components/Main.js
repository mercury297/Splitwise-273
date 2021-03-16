/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Profile from './Profle';
import LandingPage from './LandingPage';

class Main extends Component {
  render() {
    return (
      <div>
        <Route exact path="/user/login" component={Login} />
        <Route exact path="/user/register" component={Register} />
        <Route exact path="/user/profile" component={Profile} />
        <Route exact path="/" component={LandingPage} />
      </div>
    );
  }
}

export default Main;
