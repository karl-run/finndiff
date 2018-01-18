const { version } = require('../../package.json');
const scraper = require('../scraper/scraper');
const { findAdData, insertAdData, watchedExists, addWatchedAd, getAllWatched } = require('../mongo/mongo');

const rootQueryResolver = {
  Query: {
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
    rawAd: (_, { id }) => {
      return scraper.singleAd(id);
    },
    watched: () => {
      return getAllWatched();;
    }
  },
  Mutation: {
    addWatched: (_, { id }) => {
      return scraper.singleAd(id).then(result => {
        if (result.error) {
          log.warn(`Unable to add ad '${id}' to watched list, status code ${result.error.statusCode}`);
          return false;
        }

        return watchedExists(id).then(exists => {
          if (exists) return false;
          return addWatchedAd(id)
            .then(() => true)
            .catch(() => false);
        });
      });
    },
  }
};

module.exports = rootQueryResolver;
