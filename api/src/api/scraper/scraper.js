const request = require('request-promise');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const { mapSingleToResponse, mapErrorToResponse } = require('./mapper');

const virtualConsole = new jsdom.VirtualConsole();
const root_url = 'https://www.finn.no/realestate/homes/ad.html?finnkode=';

const singleAd = (finnCode) => {
  const url = root_url + finnCode;
  log.info(`Requesting ${url}`);
  return request(url)
    .then((response) => {
      const dom = new JSDOM(response, { runScripts: "dangerously", virtualConsole });
      return dom.window;
    })
    .then(mapSingleToResponse)
    .catch(mapErrorToResponse)
}

module.exports = {
  singleAd,
}