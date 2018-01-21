import gql from 'graphql-tag';

export const versionQuery = gql`
  query Version {
    version
  }
`;

export const watchedQuery = gql`
  query Watched {
    watched {
      finnCode
      description
    }
  }
`;
