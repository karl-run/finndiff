var deep = require('deep-diff');

const setValue = (object, path, value) => {
  for (let i = 0; i < path.length - 1; i++) {
    const n = path[i];
    if (n in object) {
      object = object[n];
    } else {
      object[n] = {};
      object = object[n];
    }
  }
  object[path[path.length - 1]] = value;
};

const mapDiffToValues = (diff, finnCode) => {
  const newValues = {
    finnkode: finnCode,
    pulled: new Date(Date.now()).toISOString(),
  };

  diff.forEach(edit => {
    setValue(newValues, edit.path, edit.lhs);
  });

  return newValues;
};

const removeUnecessaryMetadata = ad => {
  const cleaned = { ...ad };

  delete cleaned._id;
  delete cleaned.pulled;

  return cleaned;
};

const diffAds = (freshAd, existing) => {
  const diff = deep.diff(removeUnecessaryMetadata(freshAd), removeUnecessaryMetadata(existing));

  if (!diff) {
    return null;
  }

  return mapDiffToValues(diff, freshAd.finnkode);
};

module.exports = diffAds;
