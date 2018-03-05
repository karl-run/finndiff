const { graphql } = require('graphql');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

const root = require('./resolvers');
const schema = require('./schema');

const checkJwt = jwt({
  credentialsRequired: false,
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://finndiff.eu.auth0.com/.well-known/jwks.json`,
  }),
  audience: process.env.AUTH0_ID,
  issuer: `https://finndiff.eu.auth0.com/`,
  algorithms: ['RS256'],
});

const init = app => {
  app.use(
    '/api/graphql',
    checkJwt,
    bodyParser.json(),
    graphqlExpress(req => ({
      schema,
      context: {
        loggedIn: !!req.user,
        user: req.user,
      },
    })),
  );
  app.get('/api/graphiql', graphiqlExpress({ endpointURL: '/api/graphql' }));
  app.post('/api/uh-oh', bodyParser.json(), (req, res) => {
    log.error('Client reported error:');

    log.error(req.body.message);
    log.error(req.body.info);

    res.send({ ok: '2k' });
  });
};

module.exports = {
  init,
};
