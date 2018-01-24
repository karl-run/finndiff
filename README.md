# finndiff [![Build Status](https://travis-ci.org/karl-run/finndiff.svg?branch=master)](https://travis-ci.org/karl-run/finndiff)

<img src="packages/web/src/img/logo.png" alt="alt text" width="100px" height="100px">

Unofficial, not affiliated with Finn.no, Schibsted or Polaris Media.

## Development

This project has two modules, `api` and `web`, with backend and frontend respectively. For development you can run them both at the same time from the root folder.

#### Running both from root folder
0. `npm i` (installs dependencies for both modules)
1. `npm run dev`

This starts the api with nodemon, and the development build of the web project. The web project is proxied through CRA's [proxy](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#proxying-api-requests-in-development) functionality. Meaning that you should browse the application through `localhost:3000` and use graphiql through `localhost:4000/api/graphql`. This is not true for the production build, where the api module statically serves the web build.

#### Run only api
0. `cd api`
2. `npm run dev`

#### Run only web
0. `cd web`
2. `npm run start`

## Deployment

This project has been configured to be deployed to [now.sh](https:now.sh).

#### Prerequisites

0. A now.sh account
1. now.sh cli installed
2. A mongodb database and its connection string

#### Deploying

Run from the root folder

0. `now --public -e MONGO_URL=<url-to-mongo-db>` (you can omit the `--public` flag if you are on a paid plan)

You can omit the -e flag if you configure environment variables in the `now.json` file. It's best to use [secrets](https://zeit.co/docs/features/env-and-secrets#securing-env-variables-using-secrets) so you don't commit full access to your DB.

#### What happens

When deploying to now.sh it runs `npm i` and `npm build` in the build step. This creates a production build of the web module. It then runs `npm start` which starts the api node server with the production flag, which is the API and hosts the static files in the web folder.
