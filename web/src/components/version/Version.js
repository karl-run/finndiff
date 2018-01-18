// @flow

import React from 'react';
import { graphql } from 'react-apollo';

import { versionQuery } from '../../apollo/queries';

import './Version.css';

type Props = {
  data: {
    version: string,
  };
}

class Version extends React.PureComponent<Props> {
  render() {
    const { data } = this.props;

    return (
      <div className="version">Version: {data.version}</div>
    );
  }
}

const withVersion = graphql(versionQuery);

export default withVersion(Version);
