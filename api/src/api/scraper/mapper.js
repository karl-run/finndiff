const mapSingleToResponse = (window) => {
  log.debug("in map single", window.document.body.children);
  return 'single';
}

const mapErrorToResponse = (response) => {
  console.log('we error now');
  console.log(response)
  return 'error';
}

module.exports = {
  mapSingleToResponse,
  mapErrorToResponse
}
