const { version } = require('../../package.json');
const scraper = require('../scraper/scraper');
const { findAdData, insertAdData } = require('../mongo/mongo');

const rootQueryResolver = {
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

module.exports = rootQueryResolver;
