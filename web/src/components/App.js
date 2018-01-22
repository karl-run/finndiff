import React, { Component, Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { customTheme } from '../theme/normal';
import apolloClient from '../apollo/apollo';
import Watched from './watched/Watched';
import Content from './content/Content';

import './App.css';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <MuiThemeProvider muiTheme={customTheme}>
          <Router>
            <Fragment>
              <Watched />
              <Content />
            </Fragment>
          </Router>
        </MuiThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
