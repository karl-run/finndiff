var deep = require('deep-diff')

const diffAds = (oldAd, newAd) => {
  const diff = deep.diff(oldAd, newAd);

  log.warn(diff);

  return null;
} 

module.exports = diffAds;