// @flow

import React from 'react';
import { graphql } from 'react-apollo';

import { versionQuery } from '../../apollo/queries';
import { version } from '../../../package.json';

import style from './Version.css';

type Props = {
  data: {
    version: string,
  },
};

class Version extends React.PureComponent<Props> {
  render() {
    const { data } = this.props;

    return (
      <div className={style.version}>
        <div>
          finndiff {data.version} {process.env.NODE_ENV === 'development' && `(dev)`}
        </div>
        <div>
          <a href="https://github.com/karl-run/finndiff">Kildekode</a>
        </div>
      </div>
    );
  }
}

const withVersion = graphql(versionQuery);

export default withVersion(Version);
