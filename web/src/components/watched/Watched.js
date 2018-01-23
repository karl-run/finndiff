// @flow

import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Spinner from 'react-nano-spinner';
import { graphql } from 'react-apollo';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import Logo from '../animatedlogo/AnimatedLogoLoading';
import Version from '../version/Version';
import AddWatched from './addwatched/AddWatched';

import { watchedQuery } from '../../apollo/queries';

import logoTop from '../../img/logo_top.svg';
import logoBottom from '../../img/logo_bottom.svg';
import style from './Watched.css';

const LogoHeader = ({ toggleDrawer }) => (
  <IconButton onClick={toggleDrawer} containerElement={<Link to={`/`} />} className={style.logoHeader}>
    <Logo alt="finndiff logo" delay={10} src={logoTop} />
    <Logo alt="finndiff logo" delay={150} src={logoBottom} />
  </IconButton>
);

const WatchedList = withRouter(({ toggleDrawer, loading, watched, location }) => {
  return (
    <List className={style.watchedList}>
      {loading && (
        <ListItem disabled>
          <Spinner />
        </ListItem>
      )}
      {!loading &&
      watched &&
      watched.map(ad => (
        <ListItem
          className="watched-ad-item"
          innerDivStyle={listItemStyle}
          onClick={toggleDrawer}
          containerElement={<Link to={`/diff/${ad.finnCode}`} />}
          key={ad.finnCode}
          primaryText={ad.finnCode}
          secondaryText={ad.description}
          title={ad.description}
          rightIcon={location.pathname.indexOf(ad.finnCode) > 0 ? <i className="material-icons">play_arrow</i> : null}
        />
      ))}
      {!loading && !watched && <ListItem disabled>Fant ingen annonser</ListItem>}
    </List>
  );
});

type Props = {
  data: {
    loading: boolean,
    watched: Array<string>,
  },
  open: boolean,
  isMobile: boolean,
  handleRequestChange: (open: boolean) => void,
  toggleDrawer: () => void,
};

const listItemStyle = {
  paddingTop: '10px',
  paddingBottom: '10px',
};

class Watched extends Component<Props> {
  render() {
    const { isMobile, open, handleRequestChange, toggleDrawer, data: { loading, watched } } = this.props;

    let drawerProps;
    if (isMobile) {
      drawerProps = {
        open,
        docked: false,
        onRequestChange: handleRequestChange,
      }
    } else {
      drawerProps = {
        docked: true,
      }
    }

    return (
      <Fragment>
        <Drawer {...drawerProps} className={style.watched}>
          <LogoHeader toggleDrawer={toggleDrawer}/>
          <AddWatched />
          <Subheader>Favoritt-annonser</Subheader>
          <ListItem disabled>Du har ingen favoritter.</ListItem>
          <Subheader>Overvåkte annonser</Subheader>
          <WatchedList toggleDrawer={toggleDrawer} loading={loading} watched={watched} />
          <Version />
        </Drawer>
      </Fragment>
    );
  }
}

const withApollo = graphql(watchedQuery);

export default withApollo(Watched);
