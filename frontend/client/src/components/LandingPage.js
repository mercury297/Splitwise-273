/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/landingPage.css';

class LandingPage extends Component {
  render() {
    return (
      <nav className="navbar">
        <div className="container-fluid">
          {/* <a className="navbar-brand">
          </a> */}
          <Link to="/" className="navbar-brand" id="logoBox">
            <img id="logo" src="http://localhost:3001/logo.png" alt="Splitwise" />
            <span id="logoTitle">Splitwise</span>
          </Link>
          <Link to="/user/login" id="logIn"> Log in </Link>
          <Link to="/user/register" className="btn" id="signUp"> Sign up </Link>
        </div>
      </nav>
    );
  }
}

export default LandingPage;
