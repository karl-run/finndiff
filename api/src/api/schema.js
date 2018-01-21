const { buildSchema } = require('graphql');
const resolvers = require('./resolvers');
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = `
  type Ad {
    tittel: String
    adresse: String
    pris: Int
    omkostninger: String
    matrikkelinformasjon: String
  }

  type WatchedAd {
    finnCode: String!
    description: String
  }

  type Query {
    version: String
    watched: [WatchedAd]!
    adHistory(id: String!): [Ad]!
    rawAd(id: String!): Ad!
  }

  type Mutation {
    addWatched(id: String!): Boolean
  }
`;

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
