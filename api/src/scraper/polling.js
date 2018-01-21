const { getAllWatched, getAdData, insertAdData } = require('../mongo/mongo');
const { singleAd } = require('./scraper');
const differ = require('./differ');

//process.env.POLL_RATE = 100000;
const rate = process.env.POLL_RATE || 60 * 60 * 1000; // 1 hour
const feedRate = process.env.FEED_RATE || 2000; // 2 seconds +/- 1 second

const scrapeDiffAndStore = (finnCode, i = 0) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const promises = [singleAd(finnCode), getAdData(finnCode)];
      const [freshAd, newestExisting] = await Promise.all(promises).catch(error => {
        log.error(`Error occured in scraping or fetching of ${finnCode}`);
        return reject(error);
      });

      console.log('sold?', freshAd.solgt);

      if (!newestExisting.length) {
        log.info(`${finnCode} does not exist, inserting into db.`);
        insertAdData(freshAd);
        return resolve();
      }

      log.info(`${finnCode} already exist, let's diff it`);

      //const diff = differ(freshAd, newestExisting);
      //console.log(diff);  

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
    const watched = (await getAllWatched()).map(ad => ad.finnCode);

    log.info(`Will update ${watched.length} different ads.`);

    watched.forEach(scrapeDiffAndStore);
  };

  // Fire once immidiately
  interval();
  setInterval(interval, rate);
};

module.exports = { init: startPolling, scrapeDiffAndStore };
