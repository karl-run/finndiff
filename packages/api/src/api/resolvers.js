const { version } = require('../../package.json');
const scraper = require('../scraper/scraper');
const { scrapeDiffAndStore } = require('../scraper/polling');
const {
  insertAdData,
  watchedExists,
  addWatchedAd,
  getAllWatched,
  getAllLiked,
  getAdData,
  likeAd,
} = require('../mongo/mongo');

const rootQueryResolver = {
  Query: {
    version: () => {
      return version;
    },
    user: (_, args, { loggedIn, user }) => {
      return {
        loggedIn,
        name: null, // TODO get user info
      };
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
    liked: (_, args, { loggedIn, user }) => {
      if (!loggedIn) return [];

      return getAllLiked(user.sub);
    },
  },
  Mutation: {
    addWatched: async (_, { id }, { loggedIn, user }) => {
      const result = await scraper.singleAd(id);

      if (result.error) {
        log.warn(`Unable to add ad '${id}' to watched list, status code ${result.error.statusCode}`);
        return new Error(`Det ser ikke ut som '${id}' er en gyldig annonse`);
      }

      const exists = await watchedExists(id);

      if (exists) return new Error(`${id} er allerede lagt til.`);

      const added = await addWatchedAd(id, result.tittel)
        .then(async () => {
          if (loggedIn) {
            return await likeAd(id, user.sub);
          } else {
            return true;
          }
        })
        .catch((err) => {
          log.error(err);
          new Error(`Det skjedde en uforvented feil i tileggingen av ${id}.`)
        });

      if (added) {
        scrapeDiffAndStore(id);
      }

      return added;
    },

    like: async (_, { id }, { loggedIn, user }) => {
      if (!loggedIn) {
        throw Error('Du må være logget inn for å like annonser.');
      }

      const exists = await watchedExists(id);

      if (!exists) {
        return new Error(`${id} er ikke en annonse som finnes.`);
      }

      const result = await likeAd(id, user.sub);

    },
  },
};

module.exports = rootQueryResolver;
