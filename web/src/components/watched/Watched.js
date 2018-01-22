// @flow

import React, { Component } from 'react';
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

import logo from '../../img/logo.svg';
import style from './Watched.css';

const LogoHeader = () => (
  <IconButton containerElement={<Link to={`/`} />} className={style.logoHeader}>
    <Logo alt="finndiff logo" src={logo} />
  </IconButton>
);

const WatchedList = withRouter(({ loading, watched, location }) => (
  <List>
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
));

type Props = {
  data: {
    loading: boolean,
    watched: Array<string>,
  },
};

const listItemStyle = {
  paddingTop: '10px',
  paddingBottom: '10px',
};

class Watched extends Component<Props> {
  render() {
    const { data: { loading, watched } } = this.props;

    return (
      <Drawer docked className={style.watched}>
        <LogoHeader />
        <AddWatched />
        <Subheader>Favoritt-annonser</Subheader>
        <ListItem disabled>Du har ingen favoritter.</ListItem>
        <Subheader>Overvåkte annonser</Subheader>
        <WatchedList loading={loading} watched={watched} />
        <Version />
      </Drawer>
    );
  }
}

const withApollo = graphql(watchedQuery);

export default withApollo(Watched);
