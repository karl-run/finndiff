import gql from 'graphql-tag';

export const addWatched = gql`
  mutation addWatched($finnCode: String!) {
    addWatched(id: $finnCode)
  }
`;
