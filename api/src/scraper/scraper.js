const request = require('request-promise');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const { mapSingleToResponse, mapErrorToResponse } = require('./mapper');

const root_url = 'https://www.finn.no/realestate/homes/ad.html?finnkode=';
const virtualConsole = new jsdom.VirtualConsole();
const jsdomOptions = {
  contentType: 'text/html',
  userAgent: 'Mozilla/5.0 (Windows NT 6.1) PlsÅpneAPIetForAlle (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
  includeNodeLocations: true,
  runScripts: 'dangerously',
  virtualConsole
};

const singleAd = finnCode => {
  const url = root_url + finnCode;
  log.info(`Requesting ${url}`);
  return JSDOM.fromURL(url)
    .then(dom => dom.window)
    .then(mapSingleToResponse)
    .catch(mapErrorToResponse);

  return request(url).then(response => {
    const dom = new JSDOM(response, jsdomOptions);
    return dom.window;
  });
};

module.exports = {
  singleAd
};
