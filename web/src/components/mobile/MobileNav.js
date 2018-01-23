// @flow

import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

import style from './MobileNav.css';

type Props = {
  isMobile: boolean,
  toggle: Function,
  change: (open: boolean) => void,
};

class MobileNav extends React.Component<Props> {
  share = () => {
    if (!navigator.share) return;

    navigator.share({
      title: 'Finndiff',
      text: 'Sjekk ut denne annonsen og om den har endret seg!',
      url: window.location.href,
    })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
  };

  render() {
    if (!this.props.isMobile) return null;

    let navigatorProps = {};
    if (navigator.share || true) {
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
      />
    );
  }
}

export default MobileNav;
