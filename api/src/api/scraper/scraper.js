const request = require('request-promise');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const { mapSingleToResponse, mapErrorToResponse } = require('./mapper');

const root_url = 'https://www.finn.no/realestate/homes/ad.html?finnkode=';

const singleAd = (finnCode) => {
  return request(root_url + finnCode)
    .then((response) => {
      return new JSDOM(response).window;
    })
    .then(mapSingleToResponse)
    .catch(mapErrorToResponse)
}

module.exports = {
  singleAd,
}