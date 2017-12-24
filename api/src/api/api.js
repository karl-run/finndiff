const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const { version } = require('../../package.json')

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    version: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
    version: () => {
        return version;
    },
};

const init = app => {
    app.use('/api/graphql', graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    }));
}

module.exports = {
    init,
}
