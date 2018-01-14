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
    ...mapDescriptiveListToMap(selectSection(infoSection, 'dl:nth-of-type(2)').children),
    ...mapDescriptiveListToMap(selectSection(infoSection, 'dl:nth-of-type(3)').children),
    ...pullOutAndMapGenericSections(selectAll(infoSection, 'div.object-description')),
    omkostninger: selectValue(infoSection, '#omkostninger'),
    matrikkelinfo: selectValue(infoSection, '#matrikkelinfo'),
  };

  //log.info('\n', util.inspect(adContent, false, null));

  // TODO don't stringify
  return JSON.stringify(adContent);
};

const mapErrorToResponse = error => {
  log.error(error.message);
  return 'An error occured';
};

module.exports = {
  mapSingleToResponse,
  mapErrorToResponse
};
