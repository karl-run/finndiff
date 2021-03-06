const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const orderBy = require('lodash.orderby');
const { logError } = require('./mongoError');

const url = process.env.MONGO_URL;

let db;
let ads;
let likes;
let watched;

const initialize = () => {
  if (!url) {
    throw Error('No MONGO_URL environment variable set');
  }

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
      likes = db.collection('likes');
      watched = db.collection('watched');
      return resolve();
    });
  });
};

const addWatchedAd = (finnCode, originalDescription) => {
  if (!finnCode) return Promise.reject("Finn code can't be nothing");

  return new Promise((resolve, reject) => {
    const nowIso = new Date().toISOString();

    return watched
      .insert({
        finnCode: finnCode,
        description: originalDescription,
        active: true,
        added: nowIso,
        lastChanged: nowIso,
      })
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

const updateWatchedMetadata = async (finnCode, changeCount, status, nowIso = new Date().toISOString()) => {
  if (!finnCode || !changeCount) {
    return Promise.reject('Both finnCode and changeCount is required');
  }

  const exists = await watched.findOne({ finnCode });

  if (!exists) {
    throw Error('Unable to find watched ad with code: ' + finnCode);
  }

  log.debug(`Updating ${finnCode} from ${exists.changes} to ${changeCount} changes with sold == ${status === 'SOLGT'}`);

  const updated = await watched.update(
    { finnCode },
    { ...exists, changes: changeCount, lastUpdated: nowIso, sold: status === 'SOLGT' },
  );

  return updated.result.ok;
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
        log.debug(`Unexpected error while checking if  ${id} exists.`);
        log.error(err);
        reject(false);
      });
  });
};

const mapToWatchedItem = items =>
  (items || []).map(item => ({
    finnCode: item.finnCode,
    description: item.description,
    changes: item.changes,
    lastChanged: item.lastUpdated,
    sold: item.sold,
  }));

const getAllWatched = async sortBy => {
  return new Promise((resolve, reject) => {
    watched
      .find({})
      .toArray()
      .then(mapToWatchedItem)
      .then(mapped => {
        resolve(orderBy(mapped, sortBy, 'desc'));
      })
      .catch(err => {
        log.debug(`Unable to find all watched ads.`);
        log.error(err);
        reject(false);
      });
  });
};

const getAllLiked = async (userId, sortBy) => {
  const liked = await likes.findOne({ userId });

  if (!liked || liked.likes.length === 0) {
    return [];
  }

  return await watched
    .find({ finnCode: { $in: liked.likes } })
    .toArray()
    .then(mapToWatchedItem)
    .then(mapped => {
      return orderBy(mapped, sortBy, 'desc');
    });
};

const insertAdData = ad => {
  if (!ad || !ad.finnkode) {
    return Promise.reject('The ad is not good enough.');
  }

  return new Promise((resolve, reject) => {
    ads.insert(ad);
    log.debug(`Inserted ad ${ad.finnkode} successfully.`);
    resolve();
  });
};

const likeAd = async (id, userId) => {
  if (!id || !userId) {
    return Promise.reject('Both id and user id are required');
  }

  const exists = await likes.findOne({ userId });

  if (!exists) {
    const insert = await likes.insert({ userId, likes: [id] });
    return insert.result.ok;
  } else if (exists.likes.includes(id)) {
    throw Error(`${id} er allerede likt.`);
  }

  const updated = await likes.update({ userId }, { userId, likes: [...exists.likes, id] });

  return updated.result.ok;
};

const getAdData = finnCode => {
  return new Promise((resolve, reject) => {
    ads
      .find({ finnkode: finnCode })
      .sort({ pulled: 1 })
      .toArray((err, docs) => {
        if (err != null) {
          reject(err);
        }

        if (docs == null) {
          log.warn('Found no documents');
          resolve(null);
        }

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

const deleteAllForAd = async finnkodes => {
  finnkodes.forEach(async finnkode => {
    let result = await ads.find({ finnkode }).toArray();

    log.warn('Ads before deletion: ' + result.length);

    ads.deleteMany({ finnkode });

    watched.deleteMany({ finnCode: finnkode });

    result = await ads.find({ finnkode }).toArray();

    log.warn('Ads after deletion: ' + result.length);
  });
};

module.exports = {
  initialize,
  insertAdData,
  getAllWatched,
  getAllLiked,
  getAdData,
  findAllAds,
  addWatchedAd,
  watchedExists,
  updateWatchedMetadata,
  likeAd,
  deleteAllForAd,
};
