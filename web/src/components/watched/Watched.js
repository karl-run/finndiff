// @flow

import React from 'react';
import Spinner from 'react-nano-spinner';
import { graphql } from 'react-apollo';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';

import { watchedQuery } from '../../apollo/queries';

import logo from '../../img/logo.svg';
import style from './Watched.css';

const LogoHeader = () => (
  <IconButton href="/" className={style.logoHeader}>
    <img alt="finndiff logo" src={logo} />
  </IconButton>
);

type Props = {
  data: {
    loading: boolean,
    watched: Array<string>
  }
};

class Version extends React.PureComponent<Props> {
  render() {
    const { data: { loading, watched } } = this.props;

    return (
      <Drawer docked className={style.watched}>
        <LogoHeader />
        <Subheader>Overvåkte annonser</Subheader>
        <List>
          {loading && (
            <ListItem disabled>
              <Spinner />
            </ListItem>
          )}
          {!loading &&
            watched &&
            watched.map(id => (
              <ListItem key={id}>
                <a href="/">{id}</a>
              </ListItem>
            ))}
          {!loading && !watched && <ListItem>Fant ingen annonser</ListItem>}
        </List>
      </Drawer>
    );
  }
}

const withVersion = graphql(watchedQuery);

export default withVersion(Version);
