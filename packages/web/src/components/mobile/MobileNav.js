// @flow

import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';

import style from './MobileNav.css';
import CircularProgress from 'material-ui/CircularProgress';

type Props = {
  isMobile: boolean,
  toggle: Function,
  change: (open: boolean) => void,
};

class MobileNav extends React.Component<Props> {
  state = {
    spinning: false,
    errored: false,
  };

  share = () => {
    if (!navigator.share) return;

    this.setState({ spinning: true });
    navigator.share({
      title: 'Finndiff',
      text: 'Sjekk ut denne annonsen og om den har endret seg!',
      url: window.location.href,
    })
      .then(() => {
        this.setState({ spinning: false });
      })
      .catch(() => {
        this.setState({ spinning: false, errored: true });
      });
  };

  unerror = () => {
    this.setState({ errored: false });
  };

  render() {
    if (!this.props.isMobile) return null;

    let navigatorProps = {};
    if (this.state.spinning) {
      navigatorProps = {
        iconElementRight: <IconButton><CircularProgress color="#ffffff" size={30} /></IconButton>,
      };
    } else if (navigator.share || true) {
      navigatorProps = {
        iconElementRight: <IconButton iconClassName="material-icons">share</IconButton>,
        onRightIconButtonClick: this.share,
      }
    }


    return (
      <AppBar
        className={style.mobileNav}
        onLeftIconButtonClick={this.props.toggle}
        title="Finndiff"
        {...navigatorProps}
      >
        <Snackbar
          open={this.state.errored}
          message="Unable to share at this moment."
          autoHideDuration={4000}
          onRequestClose={this.unerror}
        />
      </AppBar>
    );
  }
}

export default MobileNav;
