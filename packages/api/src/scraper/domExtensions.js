const unbreakTextNode = node => {
  node.innerHTML = node.innerHTML.replace(/<br>/g, '\n');

  return node.textContent;
};

const selectSection = (node, selector) => node.querySelector(selector);

const selectAll = (node, selector) => node.querySelectorAll(selector);

module.exports = {
  unbreakTextNode,
  selectSection,
  selectAll,
};
