// @flow

import React from 'react';
import { graphql } from 'react-apollo';

import { versionQuery } from '../../apollo/queries';

import style from './Version.css';

type Props = {
  data: {
    version: string
  }
};

class Version extends React.PureComponent<Props> {
  render() {
    const { data } = this.props;

    return (
      <div className={style.version}>
        Version: {data.version} ({process.env.NODE_ENV})
      </div>
    );
  }
}

const withVersion = graphql(versionQuery);

export default withVersion(Version);
