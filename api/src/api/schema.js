const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Ad {
    tittel: String
    adresse: String
    pris: Int
    omkostninger: String
    matrikkelinformasjon: String
  }

  type Query {
    version: String
    singleAd: String
    adHistory: String
    rawAd(id: String!): Ad!
  }
`);

module.exports = schema;
