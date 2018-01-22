const deepFind = (obj, path) => {
  let current = obj;

  for (let i = 0; i < path.length; ++i) {
    if (current[path[i]] == null) {
      return undefined;
    } else {
      current = current[path[i]];
    }
  }

  return { value: current, date: obj.pulled };
};

export const pullOutHistory = (path, ads) => {
  const values = [];

  for (let i = 0; i < ads.length; i++) {
    const value = deepFind(ads[i], path);

    if (value) {
      values.push(value);
    }
  }

  return values;
};
