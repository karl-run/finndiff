import React from 'react';
import { ApolloProvider } from 'react-apollo';

import apolloClient from './apollo/apollo';
import Version from './components/version/Version';
import Watched from './components/watched/Watched';

import './style/_reset.css';
import './style/_base.css';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <div className="App">
          <h2>finndiff</h2>
          <p>TODO</p>
          <Version />
          <Watched />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
