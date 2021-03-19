/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import LandingPage from './LandingPage';
import Dashboard from './Dashboard/Dashboard';
import CreateGroup from './CreateGroup';

class Main extends Component {
  render() {
    return (
      <div>
        <Route exact path="/user/login" component={Login} />
        <Route exact path="/user/register" component={Register} />
        <Route exact path="/user/profile" component={Profile} />
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/createGroup" component={CreateGroup} />
      </div>
    );
  }
}

export default Main;
