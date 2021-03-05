/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          {}
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
