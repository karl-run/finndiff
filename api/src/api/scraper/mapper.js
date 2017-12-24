const mapSingleToResponse = (window) => {
  console.log(window.document.body);
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
