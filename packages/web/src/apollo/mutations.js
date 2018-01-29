import gql from 'graphql-tag';

export const addWatched = gql`
  mutation addWatched($finnCode: String!) {
    addWatched(id: $finnCode)
  }
`;

export const likeMutation = gql`
  mutation like($finnCode: String!) {
    like(id: $finnCode)
  }
`;
