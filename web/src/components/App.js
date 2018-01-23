import React, { Component, Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SizeListener from 'react-window-size-listener';

import { customTheme } from '../theme/normal';
import apolloClient from '../apollo/apollo';
import Watched from './watched/Watched';
import Content from './content/Content';
import MobileNav from './mobile/MobileNav';

import './App.css';

type State = {
  isMobile: boolean,
  menuOpen: boolean,
}

class App extends Component<{}, State> {
  state = {
    isMobile: false,
    menuOpen: true,
  };

  componentDidMount() {
    this.setState({ isMobile: window.innerWidth <= 960 })
  }

  onResize = (size) => {
    if (size.windowWidth > 960 && this.state.isMobile) {
      this.setState({ isMobile: false });
    } else if (size.windowWidth <= 960 && !this.state.isMobile) {
      this.setState({ isMobile: true });
    }
  };

  toggleDrawer = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  setDrawer = (open) => {
    this.setState({ menuOpen: open });
  };

  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <MuiThemeProvider muiTheme={customTheme}>
          <Router>
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
            </Fragment>
          </Router>
        </MuiThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
