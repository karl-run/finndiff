const polling = require('../polling');

const listingFull = require('./ex_ad_root');
const listingOneChanged = require('./ex_ad_root_changed_1');
const listingOneAdded = require('./ex_ad_root_added_1');
const listingOneRemoved = require('./ex_ad_root_removed_1');

test('when a single value has changed it should return a correct truth object', () => {
  const result = polling.createTruth([listingFull, listingOneChanged]);

  expect(Object.keys(result).length).toEqual(Object.keys(listingFull).length);
  expect(result.generelleSeksjoner.beliggenhet.verdi).toEqual(listingOneChanged.generelleSeksjoner.beliggenhet.verdi);
});

test('when a single property has been added it should return a correct truth object', () => {
  const result = polling.createTruth([listingFull, listingOneAdded]);

  expect(Object.keys(result).length).toEqual(Object.keys(listingFull).length);
  expect(Object.keys(result.leilighetsDetaljer).length).toEqual(2);
  expect(result.leilighetsDetaljer.antallRom).toEqual({
    beskrivelse: 'Antall rom',
    verdi: 3,
  });
});

// TODO fix: Currently fails because merging of removed props isn't implemented properly.
test('when a single property has been removed it should return a correct truth object', () => {
  const result = polling.createTruth([listingFull, listingOneRemoved]);

  expect(Object.keys(result).length).toEqual(Object.keys(listingFull).length);
  expect(Object.keys(result.generelleSeksjoner).length).toEqual(1);
  expect(result.leilighetsDetaljer).toEqual({
    'beliggenhet': {
      'beskrivelse': 'Beliggenhet',
      'verdi': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras laoreet.',
    },
  });
});

/*
const genesis = {
  code: 1,
  value: 10,
  description: "Something",
  otherValue: "Something else",
};

const diffOne = {
  code: 1,
  description: null,
};

const diffTwo = {
  code: 1,
  otherValue: "Now this changed"
};

// genesis + diffOne + diffTwo =
const truth = {
  code: 1,
  value: 10,
  description: "This has changed",
  otherValue: "Now this changed",
};
*/
