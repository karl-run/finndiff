const mongo = require('../mongo/mongo');
const {
  selectValue,
  selectSection,
  selectAll,
  cleanNumber,
  cleanCostString,
  mapDescriptiveListToMap,
  pullOutAndMapGenericSections
} = require('./mapHelpers');

const util = require('util');

const mapSingleToResponse = window => {
  const infoSection = window.document.querySelector(
    'body > div.container.bg-ice.pbs > div > div.line > div.unit.r-size2of3 > div > div > div'
  );

  const adContent = {
    tittel: selectValue(infoSection, 'h1'),
    adresse: selectValue(infoSection, 'p:nth-of-type(1)'),
    pris: selectValue(infoSection, 'dl:nth-of-type(1) dd', [cleanNumber]),
    prisDetaljer: mapDescriptiveListToMap(selectSection(infoSection, 'dl:nth-of-type(2)').children),
    leilighetsDetaljer: mapDescriptiveListToMap(selectSection(infoSection, 'dl:nth-of-type(3)').children),
    generelleSeksjoner: pullOutAndMapGenericSections(selectAll(infoSection, 'div.object-description')),
    omkostninger: selectValue(infoSection, '#omkostninger'),
    matrikkelinformasjon: selectValue(infoSection, '#matrikkelinfo')
  };

  log.info('\n', util.inspect(adContent, false, null));

  console.log('----');
  Object.keys(adContent).forEach(console.log);

  return adContent;
};

const mapErrorToResponse = error => {
  log.error('An error occured');
  log.error(`Error code ${error.statusCode}`);
  if (error.response && typeof error.response.body === 'string') {
    log.error(error.response.body);
  }

  return 'An error occured';
};

module.exports = {
  mapSingleToResponse,
  mapErrorToResponse
};
