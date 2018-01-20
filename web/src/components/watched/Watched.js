// @flow

import React from 'react';
import Spinner from 'react-nano-spinner';
import { graphql } from 'react-apollo';

import { watchedQuery } from '../../apollo/queries';

import './Watched.css';

type Props = {
  data: {
    loading: boolean,
    watched: Array<string>
  }
};

class Version extends React.PureComponent<Props> {
  render() {
    const { data: { loading, watched } } = this.props;

    if (loading)
      return (
        <div className="watched-root">
          <h5>Overvåkte annonser</h5>
          <Spinner />
        </div>
      );

    return (
      <div className="watched-root">
        <ul>
          <h5>Overvåkte annonser</h5>
          {watched &&
            watched.map(id => (
              <li key={id}>
                <a href="/">{id}</a>
              </li>
            ))}
          {!watched && <div>Fant ingen annonser</div>}
        </ul>
      </div>
    );
  }
}

const withVersion = graphql(watchedQuery);

export default withVersion(Version);
