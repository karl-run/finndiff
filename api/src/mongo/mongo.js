const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { logError } = require('./mongoError');

const dbName = 'finndiff';
const url = process.env.MONGO_URL;

let db;
let ads;

const initialize = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function(err, client) {
      if (err != null) {
        logError(err);
        return reject(err);
      }

      log.info('Connected successfully to mongo database');

      let connected = true;
      db = client.db(dbName);
      ads = db.collection('what');
      return resolve();
    });
  });
};

const insertAdData = ad => {
  return new Promise((resolve, reject) => {
    ads.insert({ test: 'one two three four' });
    log.warn('Inserted test doc');
    resolve();
  });
};

const findAdData = id => {
  return new Promise((resolve, reject) => {
    ads.find({}).toArray((err, docs) => {
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

      resolve(JSON.stringify(docs.map(doc => ({ value: doc.test }))));
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
  findAdData,
  findAllAds
};
