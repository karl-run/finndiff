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

export const getSpecificAdQuery = gql`
  query getSpecificAd($finnCode: String!) {
    adHistory(id: $finnCode) {
      pulled
      tittel
      adresse
      pris
      omkostninger
      matrikkelinformasjon
    }
  }
`;
