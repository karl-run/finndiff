const mapSingleToResponse = (window) => {
  const elemenst = window.document.querySelector('body > div.container.bg-ice.pbs > div > div.line > div.unit.r-size2of3 > div > div > div').children;
  log.warn(elemenst);
  for(let i = 0; i < elemenst.length; i++) {
    log.debug(elemenst[i].textContent)
  }

  return 'single';
}

const mapErrorToResponse = (response) => {
  // TODO map error
  log.error(response);
  return 'error';
}

module.exports = {
  mapSingleToResponse,
  mapErrorToResponse
}
