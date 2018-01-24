// @flow

import React from 'react';
import { graphql } from 'react-apollo';
import IconButton from 'material-ui/IconButton';

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
        <IconButton href="https://github.com/karl-run/finndiff" iconClassName="material-icons">
          code
        </IconButton>
        <span>
          {data.version} ({process.env.NODE_ENV})
        </span>
      </div>
    );
  }
}

const withVersion = graphql(versionQuery);

export default withVersion(Version);