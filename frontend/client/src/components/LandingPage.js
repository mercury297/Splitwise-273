/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import '../styles/landingPage.css';
import Container from 'react-bootstrap/Container';

class LandingPage extends Component {
  render() {
    return (
      <div>
        <Container className="upperlanding">
          <div>
            {' '}
            <a href="/">
              <img id="logo" alt="logo" className="rounded-cirlce" src="http://localhost:3001/logo.png" />
              {' '}
            </a>
          </div>
          <a className="dropdown-reveal  px-4 block cursor-pointer font-mont font-semibold" id="login" href="user/login">Log in</a>
          <a className="bg-teal  px-3 py-2 sm:px-5 sm:py-3 rounded shadow sm-cta-button" id="signup" href="user/register">Sign up</a>
        </Container>
        <Container className="lowerlanding" />
        <img className="plane" alt="plane" src="http://localhost:3001/landingImage.png" />
      </div>
    );
  }
}

export default LandingPage;
