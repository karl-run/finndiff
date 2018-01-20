const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { logError } = require('./mongoError');

const url = process.env.MONGO_URL;

if (!url) {
  throw Error('No MONGO_URL environment variable set');
}

let db;
let ads;
let watched;

const initialize = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function(err, client) {
      if (err != null) {
        logError(err);
        return reject(err);
      }

      log.info('Connected successfully to mongo database');

      let connected = true;
      db = client.db('finndiff');
      ads = db.collection('ads');
      watched = db.collection('watched');
      return resolve();
    });
  });
};

const addWatchedAd = finnCode => {
  if (!finnCode) return Promise.reject("Finn code can't be nothing");

  return new Promise((resolve, reject) => {
    return watched
      .insert({ finnCode: finnCode, active: true, added: new Date().toISOString() })
      .then(result => {
        if (result.writeError) {
          reject(result.writeError);
        }

        resolve({ inserted: result.nInserted });
      })
      .catch(err => {
        log.error(err);
        reject(err);
      });
  });
};

const watchedExists = id => {
  return new Promise((resolve, reject) => {
    const result = watched
      .find({ finnCode: id })
      .toArray()
      .then(result => {
        log.debug(`Does ad with id ${id} exist? ${result.length > 0}`);
        resolve(result.length > 0);
      })
      .catch(err => {
        log.debug(`Unable to add with id ${id}.`);
        log.error(err);
        reject(false);
      });
  });
};

const getAllWatched = async () => {
  return new Promise((resolve, reject) => {
    const result = watched
      .find({})
      .toArray()
      .then(result => {
        const mapped = (result || []).map(item => item.finnCode);

        resolve(mapped);
      })
      .catch(err => {
        log.debug(`Unable to find all watched ads.`);
        log.error(err);
        reject(false);
      });
  });
};

const insertAdData = ad => {
  if (!ad || !ad.finnkode) {
    return Promise.reject("The ad is not good enough.");
  }

  return new Promise((resolve, reject) => {
    ads.insert(ad);
    log.debug(`Inserted ad ${ad.finnkode} successfully.`)
    resolve();
  });
};

const getAdData = finnCode => {
  return new Promise((resolve, reject) => {
    ads.find({ finnkode: finnCode }).toArray((err, docs) => {
      if (err != null) {
        reject(err);
      }

      if (docs == null) {
        log.warn('Found no documents');
        resolve(null);
      }

      docs.forEach(doc => {
        log.debug(doc.test);
      });

      resolve(docs);
    });
  });
};

const findAllAds = () => {
  return new Promise((resolve, reject) => {
    ads.find({}).toArray((err, docs) => {
      if (err != null) {
        reject(err);
      }
      log.warn('In find all');
      resolve(null);
    });
  });
};

module.exports = {
  initialize,
  insertAdData,
  getAllWatched,
  getAdData,
  findAllAds,
  addWatchedAd,
  watchedExists,
};
