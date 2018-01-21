const { version } = require('../../package.json');
const scraper = require('../scraper/scraper');
const { scrapeDiffAndStore } = require('../scraper/polling');
const { insertAdData, watchedExists, addWatchedAd, getAllWatched, getAdData } = require('../mongo/mongo');

const rootQueryResolver = {
  Query: {
    version: () => {
      return version;
    },
    adHistory: (_, { id }) => {
      return getAdData(id);
    },
    rawAd: (_, { id }) => {
      return scraper.singleAd(id);
    },
    watched: () => {
      return getAllWatched();
    },
  },
  Mutation: {
    addWatched: async (_, { id }) => {
      const result = await scraper.singleAd(id);

      if (result.error) {
        log.warn(`Unable to add ad '${id}' to watched list, status code ${result.error.statusCode}`);
        return new Error(`Det ser ikke ut som '${id}' er en gyldig annonse`);
      }

      const exists = await watchedExists(id);

      if (exists) return new Error(`${id} er allerede lagt til.`);

      const added = await addWatchedAd(id, result.tittel)
        .then(() => true)
        .catch(() => new Error(`Det skjedde en uforvented feil i tileggingen av ${id}.`));

      if (added) {
        scrapeDiffAndStore(id);
      }

      return added;
    },
  },
};

module.exports = rootQueryResolver;
