// @flow

import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Spinner from 'react-nano-spinner';
import { graphql, compose } from 'react-apollo';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
import IconButton from 'material-ui/IconButton';

import { isAuthenticated } from '../auth/Auth';
import LoginBox from '../auth/LoginBox';
import Logo from '../animatedlogo/AnimatedLogoLoading';
import Version from '../version/Version';
import AddWatched from './addwatched/AddWatched';

import { watchedQuery, likedQuery } from '../../apollo/queries';

import logoTop from '../../img/logo_top.svg';
import logoBottom from '../../img/logo_bottom.svg';
import style from './Watched.css';

const LogoHeader = ({ toggleDrawer }) => {
  return (
    <div className={style.logoHeader}>
      <IconButton onClick={toggleDrawer}>
        <Link to={`/`}>
          <Logo alt="finndiff logo" delay={10} src={logoTop} />
          <Logo alt="finndiff logo" delay={150} src={logoBottom} />
        </Link>
      </IconButton>
      <LoginBox />
    </div>
  );
};

const WatchedList = withRouter(({ toggleDrawer, loading, items, noFoundMessage, location }) => {
  return (
    <List component="nav">
      {loading && (
        <ListItem button disabled>
          <Spinner />
        </ListItem>
      )}
      {!loading &&
      items &&
      items.map(ad => (
        <ListItem
          button
          innerDivStyle={listItemStyle}
          onClick={toggleDrawer}
          containerElement={<Link to={`/diff/${ad.finnCode}`} />}
          key={ad.finnCode}
          primaryText={ad.description}
          secondaryText={ad.finnCode}
          title={ad.description}
          rightIcon={location.pathname.indexOf(ad.finnCode) > 0 ? <i className="material-icons">play_arrow</i> : null}
        />
      )).reverse()}
      {(!loading && items && items.length === 0) && <ListItem button disabled>{noFoundMessage || 'Fant ingen annonser'}</ListItem>}
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
    const { isMobile, open, handleRequestChange, toggleDrawer, watched, liked, } = this.props;

    let drawerProps;
    if (isMobile) {
      drawerProps = {
        open,
        anchor: 'left',
        onClose: handleRequestChange,
      }
    } else {
      drawerProps = {
        docked: true,
        type: 'permanent',
        anchor: 'left',
      }
    }

    const loggedIn = isAuthenticated();

    return (
      <Fragment>
        <Drawer {...drawerProps}>
          <LogoHeader toggleDrawer={toggleDrawer} />
          <AddWatched />
          <ListSubheader>Dine annonser</ListSubheader>
          {loggedIn && (
            <WatchedList
              toggleDrawer={toggleDrawer} loading={liked.loading} items={liked.liked}
              noFoundMessage="Du har ikke lagt til noen annonser."
            />
          )}
          {!loggedIn && <ListItem disabled>{'Logg inn for å se dine annonser'}</ListItem>}
          <ListSubheader>Alle overvåkte annonser</ListSubheader>
          <Version />
        </Drawer>
      </Fragment>
    );
  }
}

const withApollo = compose(
  graphql(likedQuery, {
    name: 'liked',
  }),
  graphql(watchedQuery, {
    name: 'watched',
  }),
)
export default withApollo(Watched);
