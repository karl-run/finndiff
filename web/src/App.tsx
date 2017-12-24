import * as React from 'react';
import { ApolloProvider } from 'react-apollo';

import apolloClient from './apollo/apollo';
import Version from './components/version/Version';

import './App.css';

const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <p className="App-intro"> To get started, edit <code>src/App.tsx</code> and save to reload. </p>
          <Version />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
