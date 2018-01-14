const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const { graphql } = require('graphql');

const { findAdData, insertAdData } = require('../mongo/mongo');
const scraper = require('../scraper/scraper');
const { version } = require('../../package.json');

const schema = buildSchema(`
  type Ad {
    tittel: String
    adresse: String
    pris: Int
    omkostninger: String
    matrikkelinf: String
  }

  type Query {
    version: String
    singleAd: String
    adHistory: String
    rawAd(id: String!): Ad!
  }
`);

const root = {
  version: () => {
    return version;
  },
  singleAd: () => {
    scraper.singleAd('112115083');
    return scraper.singleAd('103975107');
  },
  adHistory: () => {
    return findAdData();
  },
  rawAd: ({ id }) => {
    return scraper.singleAd(id);
  }
};

const init = app => {
  app.use(
    '/api/graphql',
    graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true
    })
  );

  // TODO: For debugging only
  graphql(schema, '{ singleAd } ', root)
    .then(response => {
      if (response.errors) {
        log.error(response.errors);
      }

      //log.debug(response.data);
    })
    .catch(err => {
      log.error(err);
    });
};

module.exports = {
  init
};
