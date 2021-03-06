const { unbreakTextNode, selectSection, selectAll } = require('./domExtensions');

const selectValue = (node, selector, functions = []) => {
  const result = node.querySelector(selector);

  if (result == null) return null;

  let cleaned = unbreakTextNode(result).trim();

  functions.forEach(func => {
    cleaned = func(cleaned);
  });

  return cleaned;
};

const cleanNumber = text => {
  if (text == null) return null;
  return parseInt(text.replace(/-|,|\s/g, ''));
};

const numberIfNotString = text => {
  if (text == null) return null;

  let cleaned = text.trim().replace(/-|,|/g, '');
  if (cleaned.length < 15) cleaned = cleaned.replace(/\s/g, '');
  const parsed = parseInt(cleaned);

  return isNaN(parsed) ? cleaned : parsed;
};

const keyifyHeader = text => {
  if (text == null) return null;
  const cleaned = text
    .trim()
    .replace(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]|\s|\/|,|(|)|'|"|\u00AD/g, '')
    .replace(/æ/g, 'ae')
    .replace(/ø/g, 'oe')
    .replace(/å/g, 'aa')
    .toLowerCase();

  return cleaned;
};

const cleanCostString = text => {
  if (text == null) return null;
  return text
    .trim()
    .replace(/\/mnd.|\s/g, '')
    .toLowerCase();
};

const mapDescriptiveListToMap = ddList => {
  const map = {};

  for (let i = 0; i < ddList.length; i += 2) {
    map[keyifyHeader(cleanCostString(ddList[i].textContent))] = {
      beskrivelse: ddList[i].textContent,
      verdi: numberIfNotString(ddList[i + 1].textContent),
    };
  }

  return map;
};

const pullOutAndMapGenericSections = sections => {
  const map = {};

  for (let i = 0; i < sections.length; i += 2) {
    const title = selectSection(sections[i], 'h2').textContent;

    map[keyifyHeader(title)] = {
      beskrivelse: title,
      verdi: unbreakTextNode(selectSection(sections[i], 'p')),
    };
  }

  return map;
};

module.exports = {
  selectValue,
  selectSection,
  selectAll,
  cleanNumber,
  cleanCostString,
  mapDescriptiveListToMap,
  pullOutAndMapGenericSections,
};
