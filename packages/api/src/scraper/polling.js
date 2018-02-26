const { getAllWatched, getAdData, insertAdData, updateWatchedMetadata } = require('../mongo/mongo');
const { singleAd } = require('./scraper');
const differ = require('./differ');
const { createTruth, removeNullValuesExceptRoot } = require('./merger');

const rate = process.env.POLL_RATE || 60 * 60 * 1000; // 1 hour
const feedRate = process.env.FEED_RATE || 2000; // 2 seconds +/- 1 second

const scrapeDiffAndStore = (watched, i = 0) => {
  const finnCode = watched.finnCode;

  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const promises = [singleAd(finnCode), getAdData(finnCode)];
      const [freshAd, newestExisting] = await Promise.all(promises).catch(error => {
        log.error(`Error occured in scraping or fetching of ${finnCode}`);
        return reject(error);
      });

      if (!newestExisting.length) {
        log.info(`${finnCode} does not exist, inserting into db.`);
        insertAdData(freshAd);
        return resolve();
      }

      let diffWith = createTruth(newestExisting);

      removeNullValuesExceptRoot(diffWith);

      const cleanDiff = differ(freshAd, diffWith);

      if (!cleanDiff) {
        log.info(`${finnCode} has not changed.`);
      } else {
        log.info(`${finnCode} has changed, saving the new values.`);
        insertAdData(cleanDiff);
        updateWatchedMetadata(finnCode, newestExisting.length + 1);
      }

      resolve();
    }, i * feedRate + Math.random() * (feedRate / 2));
  });
};

const startPolling = () => {
  log.info(
    `Setting up polling at every ${rate / 1000} seconds (${rate /
      1000 /
      60} minutes), with a feedrate of ${feedRate}ms`,
  );

  const interval = async () => {
    const watched = await getAllWatched();

    if (process.env.NODE_ENV !== 'production') {
      log.warn(`Not in production!! Only polling one ad.`);

      watched.slice(0, 1).forEach(scrapeDiffAndStore);
    } else {
      log.info(`Will update ${watched.length} different ads.`);

      watched.forEach(scrapeDiffAndStore);
    }
  };

  // Fire once immidiately
  interval();
  setInterval(interval, rate);
};

module.exports = { init: startPolling, scrapeDiffAndStore };
