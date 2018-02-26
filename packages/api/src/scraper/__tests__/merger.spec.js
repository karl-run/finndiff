const merger = require('../merger');

const listingFull = require('./ex_ad_root');
const listingOneChanged = require('./ex_ad_root_changed_1');
const listingOneAdded = require('./ex_ad_root_added_1');
const listingOneRemoved = require('./ex_ad_root_removed_1');
const listingFreshTruth = require('./ex_ad_root_fresh_truth');

test('when a single value has changed it should return a correct truth object', () => {
  const result = merger.createTruth([listingFull, listingOneChanged]);

  expect(Object.keys(result).length).toEqual(Object.keys(listingFull).length);
  expect(result.generelleSeksjoner.beliggenhet).toEqual({
    beskrivelse: 'Beliggenhet',
    verdi: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. This has changed.',
  });
});

test('when a single property has been added it should return a correct truth object', () => {
  const result = merger.createTruth([listingFull, listingOneAdded]);

  expect(Object.keys(result).length).toEqual(Object.keys(listingFull).length);
  expect(Object.keys(result.leilighetsDetaljer).length).toEqual(2);
  expect(result.leilighetsDetaljer.antallRom).toEqual({
    beskrivelse: 'Antall rom',
    verdi: 3,
  });
});

test('when a property has been added and a property has been changed it should return a correct truth object', () => {
  const result = merger.createTruth([listingFull, listingOneAdded, listingOneChanged]);

  expect(Object.keys(result).length).toEqual(Object.keys(listingFull).length);
  expect(Object.keys(result.leilighetsDetaljer).length).toEqual(2);
  expect(result.leilighetsDetaljer.antallRom).toEqual({
    beskrivelse: 'Antall rom',
    verdi: 3,
  });
  expect(result.generelleSeksjoner.beliggenhet).toEqual({
    beskrivelse: 'Beliggenhet',
    verdi: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. This has changed.',
  });
});

test('when a single property has been removed it should return a correct truth object', () => {
  const result = merger.createTruth([listingFull, listingOneRemoved]);

  expect(Object.keys(result).length).toEqual(Object.keys(listingFull).length);
  expect(Object.keys(result.generelleSeksjoner).length).toEqual(2);
  expect(result.generelleSeksjoner).toEqual({
    beliggenhet: {
      beskrivelse: 'Beliggenhet',
      verdi: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras laoreet.',
    },
    byggemaate: null,
  });
});

test('when a property has been added, a property has been changed and one has been removed it should return a correct truth object', () => {
  const result = merger.createTruth([listingFull, listingOneAdded, listingOneChanged, listingOneRemoved]);

  expect(Object.keys(result).length).toEqual(Object.keys(listingFull).length);
  expect(Object.keys(result.leilighetsDetaljer).length).toEqual(2);
  expect(result.leilighetsDetaljer.antallRom).toEqual({
    beskrivelse: 'Antall rom',
    verdi: 3,
  });
  expect(Object.keys(result.generelleSeksjoner).length).toEqual(2);
  expect(result.generelleSeksjoner).toEqual({
    beliggenhet: {
      beskrivelse: 'Beliggenhet',
      verdi: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. This has changed.',
    },
    byggemaate: null,
  });
});

test('a created truth object cleaned of null values should have no diff with a correct fresh listing.', () => {
  const result = merger.createTruth([listingFull, listingOneAdded, listingOneChanged, listingOneRemoved]);

  merger.removeNullValuesExceptRoot(result);

  expect(result).toEqual(listingFreshTruth);
});
