// @flow

import React from 'react';
import Spinner from 'react-nano-spinner';
import { graphql } from 'react-apollo';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';

import { watchedQuery } from '../../apollo/queries';

import logo from '../../svg/logo.svg';
import style from './Watched.css';

const LogoHeader = () => (
  <IconButton href="/" className={style.logoHeader}>
    <img src={logo} />
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

    if (loading) {
      return (
        <div className={style.watched}>
          <h5>Overvåkte annonser</h5>
          <Spinner />
        </div>
      );
    }

    return (
      <Drawer docked className={style.watched}>
        <LogoHeader />
        <Subheader>Overvåkte annonser</Subheader>
        <List>
          {watched &&
            watched.map(id => (
              <ListItem key={id}>
                <a href="/">{id}</a>
              </ListItem>
            ))}
          {!watched && <ListItem>Fant ingen annonser</ListItem>}
        </List>
      </Drawer>
    );
  }
}

const withVersion = graphql(watchedQuery);

export default withVersion(Version);
