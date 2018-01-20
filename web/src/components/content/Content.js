// @flow

import React from 'react';
import { graphql } from 'react-apollo';
import IconButton from 'material-ui/IconButton';

import { versionQuery } from '../../apollo/queries';

import style from './Content.css';

type Props = {
  data: {
    version: string
  }
};

class Version extends React.PureComponent<Props> {
  render() {
    const { data } = this.props;

    return (
      <div className={style.root}>
        <h2>finndiff</h2>
        <p>TODO</p>
        hello I am content
        <IconButton href="https://github.com/karl-run/finndiff" iconClassName="material-icons">
          code
        </IconButton>
      </div>
    );
  }
}

const withVersion = graphql(versionQuery);

export default withVersion(Version);
