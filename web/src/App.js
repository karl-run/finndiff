import React from 'react';
import { ApolloProvider } from 'react-apollo';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import apolloClient from './apollo/apollo';
import Version from './components/version/Version';
import Watched from './components/watched/Watched';
import Content from './components/content/Content';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <MuiThemeProvider>
          <Watched />
          <Content />
          <Version />
        </MuiThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
