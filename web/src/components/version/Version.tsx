import * as React from 'react';
import { graphql } from 'react-apollo';

import { versionQuery } from '../../apollo/queries';

interface Props {
  data: {
    version: string,
  };
}

class Version extends React.PureComponent<Props> {
  render() {
    const { data } = this.props;

    return (
      <div>Version: {data.version}</div>
    );
  }
}

interface Response {
  version: string;
}

const withVersion = graphql<Response, {}, Props>(versionQuery);

export default withVersion(Version);
