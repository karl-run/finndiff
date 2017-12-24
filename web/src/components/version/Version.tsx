import * as React from 'react';
import { graphql } from 'react-apollo';

import { versionQuery } from '../../apollo/queries';

import './Version.css';

interface Props {
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

interface Response {
  version: string;
}

const withVersion = graphql<Response, {}, Props>(versionQuery);

export default withVersion(Version);
