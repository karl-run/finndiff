const { graphql } = require('graphql');
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

const root = require('./resolvers');
const schema = require('./schema');

const init = app => {
  app.use('/api/graphql', bodyParser.json(), graphqlExpress({ schema }));
  app.get('/api/graphiql', graphiqlExpress({ endpointURL: '/api/graphql' }));
};

module.exports = {
  init
};
