// @flow

import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import Spinner from 'react-nano-spinner';
import { graphql, compose } from 'react-apollo';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
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
import { daysSince, hoursSince } from '../../utils/display';

const LogoHeader = ({ toggleDrawer }) => {
  return (
    <div className={style.logoHeader}>
      <div>
        <IconButton onClick={toggleDrawer} containerElement={<Link to={`/`} />} className={style.logoButton}>
          <Logo alt="finndiff logo" delay={10} src={logoTop} />
          <Logo alt="finndiff logo" delay={150} src={logoBottom} />
        </IconButton>
        <Version />
      </div>
      <LoginBox />
    </div>
  );
};

const PrimaryText = ({ ad }) => {
  const days = daysSince(ad.lastChanged);

  let daysContent;
  if (days === 0) {
    const hours = hoursSince(ad.lastChanged);
    if (hours === 0) {
      daysContent = <span>nå</span>;
    } else {
      daysContent = (
        <span>
          {hours} time{hours > 1 ? 'r' : ''}
        </span>
      );
    }
  } else if (days === 1) {
    daysContent = <span>i går</span>;
  } else if (days > 31) {
    daysContent = <span>Lenge siden</span>;
  } else {
    daysContent = <span>{days} dager</span>;
  }

  return (
    <div className="primary-text-content">
      <span>{ad.finnCode}</span>
      {daysContent}
    </div>
  );
};

const WatchedList = withRouter(({ toggleDrawer, loading, items, noFoundMessage, location }) => {
  return (
    <List className={style.watchedList}>
      {loading && (
        <ListItem disabled>
          <Spinner />
        </ListItem>
      )}
      {!loading &&
        items &&
        items.map(ad => (
          <ListItem
            insetChildren
            className={classNames('watched-ad-item', {
              sold: ad.sold,
              selected: location.pathname.indexOf(ad.finnCode) > 0,
            })}
            innerDivStyle={listItemStyle}
            onClick={toggleDrawer}
            containerElement={<Link to={`/diff/${ad.finnCode}`} />}
            key={ad.finnCode}
            primaryText={<PrimaryText ad={ad} />}
            secondaryText={ad.description}
            secondaryTextLines={1}
            title={ad.description}
          >
            <div className={classNames('watched-list-metadata', { sold: ad.sold, 'no-change': ad.changes - 1 === 0 })}>
              {ad.changes - 1}
            </div>
          </ListItem>
        ))}
      {!loading &&
        items &&
        items.length === 0 && <ListItem disabled>{noFoundMessage || 'Fant ingen annonser'}</ListItem>}
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
    const { isMobile, open, handleRequestChange, toggleDrawer, watched, liked } = this.props;

    let drawerProps;
    if (isMobile) {
      drawerProps = {
        open,
        docked: false,
        onRequestChange: handleRequestChange,
      };
    } else {
      drawerProps = {
        width: 320,
        docked: true,
      };
    }

    const loggedIn = isAuthenticated();

    return (
      <Fragment>
        <Drawer {...drawerProps} className={style.watched}>
          <LogoHeader toggleDrawer={toggleDrawer} />
          <AddWatched />
          <Subheader>Dine annonser</Subheader>
          {loggedIn && (
            <WatchedList
              toggleDrawer={toggleDrawer}
              loading={liked.loading}
              items={liked.liked}
              noFoundMessage="Du har ikke lagt til noen annonser."
            />
          )}
          {!loggedIn && <ListItem disabled>{'Logg inn for å se dine annonser'}</ListItem>}
          <Subheader>Alle overvåkte annonser</Subheader>
          <WatchedList toggleDrawer={toggleDrawer} loading={watched.loading} items={watched.watched} />
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
);
export default withApollo(Watched);
