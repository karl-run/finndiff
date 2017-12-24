import gql from 'graphql-tag';

export const versionQuery = gql`
  query Version {
    version
  }
`;