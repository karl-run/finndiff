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
import AddWatched from './addwatched/AddWatched'

import { watchedQuery } from '../../apollo/queries';

import logo from '../../img/logo.svg';
import style from './Watched.css';

const LogoHeader = () => (
  <IconButton containerElement={<Link to={`/`} />} className={style.logoHeader}>
    <Logo alt="finndiff logo" src={logo} />
  </IconButton>
);

type Props = {
  data: {
    loading: boolean,
    watched: Array<string>,
  },
};

class Version extends Component<Props> {
  render() {
    const { data: { loading, watched }, location } = this.props;

    return (
      <Drawer docked className={style.watched}>
        <LogoHeader />
        <AddWatched />
        <Subheader>Overvåkte annonser</Subheader>
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
                containerElement={<Link to={`/diff/${ad.finnCode}`} />}
                key={ad.finnCode}
                primaryText={ad.finnCode}
                secondaryText={ad.description}
                title={ad.description}
                rightIcon={
                  location.pathname.indexOf(ad.finnCode) > 0 ? <i className="material-icons">play_arrow</i> : null
                }
              />
            ))}
          {!loading && !watched && <ListItem disabled>Fant ingen annonser</ListItem>}
        </List>
      </Drawer>
    );
  }
}

const withVersion = graphql(watchedQuery);

export default withVersion(withRouter(Version));
