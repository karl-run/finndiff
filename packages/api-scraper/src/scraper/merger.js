const merge = require('deepmerge');

const createTruth = (newestExisting) => {
  let diffWith;
  if (newestExisting.length >= 2) {
    const [first, ...diffs] = newestExisting;

    let truth = first;

    diffs.forEach((diff) => {
      truth = merge(truth, diff);
    });

    diffWith = truth;
  } else {
    diffWith = newestExisting[0];
  }

  return diffWith;
};

const removeNullValuesExceptRoot = (obj) => {
  const ignore = Object.keys(obj);

  const removeNullValues = (obj) => {
    Object.keys(obj).forEach(key => {
      if (obj[key] && typeof obj[key] === 'object') removeNullValues(obj[key]);
      else if (!ignore.includes(key) && obj[key] == null) delete obj[key];
    });
  };

  removeNullValues(obj);
};

module.exports = {
  createTruth,
  removeNullValuesExceptRoot,
};
