/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Main from './components/Main';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <BrowserRouter>
        <div>
          {}
          <Main />
        </div>
      </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
