import React, { Component, Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SizeListener from 'react-window-size-listener';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import registerServiceWorker from '../registerServiceWorker';

import { customTheme } from '../theme/normal';
import apolloClient from '../apollo/apollo';
import Watched from './watched/Watched';
import Content from './content/Content';
import MobileNav from './mobile/MobileNav';
import AuthCallback from './auth/Callback';
import ErrorBoundary from './error/ErrorBoundary';

import './App.css';

type State = {
  isMobile: boolean,
  menuOpen: boolean,
};

class App extends Component<{}, State> {
  state = {
    isMobile: false,
    menuOpen: true,
    hasUpdate: false,
  };

  componentWillMount() {
    registerServiceWorker(this.updateArrived);
  }

  componentDidMount() {
    this.setState({ isMobile: window.innerWidth <= 960 });
  }

  onResize = size => {
    if (size.windowWidth > 960 && this.state.isMobile) {
      this.setState({ isMobile: false });
    } else if (size.windowWidth <= 960 && !this.state.isMobile) {
      this.setState({ isMobile: true });
    }
  };

  updateArrived = () => {
    this.setState({ hasUpdate: true });
  };

  toggleDrawer = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  setDrawer = open => {
    this.setState({ menuOpen: open });
  };

  handleUpdateClick = () => {
    window.location.reload();
  };

  handleUpdateRequestClose = () => {
    this.setState({ hasUpdate: false });
  };

  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <MuiThemeProvider muiTheme={customTheme}>
          <ErrorBoundary>
            <Router>
              <Switch>
                <Route exact path="/callback" component={AuthCallback} />
                <Route
                  path="/"
                  render={() => (
                    <Fragment>
                      <SizeListener onResize={this.onResize} />
                      <MobileNav toggle={this.toggleDrawer} isMobile={this.state.isMobile} />
                      <Watched
                        handleRequestChange={this.setDrawer}
                        toggleDrawer={this.toggleDrawer}
                        open={this.state.menuOpen}
                        isMobile={this.state.isMobile}
                      />
                      <Content />
                      <Dialog
                        title="Ny versjon av finndiff"
                        actions={[
                          <FlatButton label="Ignorer" primary={true} onClick={this.handleUpdateRequestClose} />,
                          <FlatButton
                            label="Oppdater nå"
                            primary={true}
                            keyboardFocused={true}
                            onClick={this.handleUpdateClick}
                          />,
                        ]}
                        modal={true}
                        open={this.state.hasUpdate}
                        onRequestClose={this.handleUpdateRequestClose}
                      >
                        Det har blitt lastet ned en ny versjon av finndiff. Trykk på oppdater nå for å få den nye
                        versjonen med en gang.
                      </Dialog>
                    </Fragment>
                  )}
                />
              </Switch>
            </Router>
          </ErrorBoundary>
        </MuiThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
