const express = require('express');
const graphqlHTTP = require('express-graphql');
const { graphql } = require('graphql');

const root = require('./resolvers');
const schema = require('./schema');

const init = app => {
  app.use(
    '/api/graphql',
    graphqlHTTP({
      schema,
      rootValue: root,
      graphiql: true
    })
  );

  if (process.env.NODE_ENV !== 'production') {
    // TODO: For debugging only
    const testQuery = `
      query {
        rawAd (id: "112115083"){
          tittel
          adresse
          pris
          matrikkelinformasjon
        }
      }
    `;
    graphql(schema, testQuery, root)
      .then(response => {
        if (response.errors) {
          log.error(response.errors);
        }

        log.debug(response.data);
      })
      .catch(err => {
        log.error(err);
      });
  }
};

module.exports = {
  init
};
