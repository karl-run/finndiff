
const init = app => {
  app.get('/api/scrape/:finnkode', (req, res) => {
    console.log(req.params.finnkode);
    log.error('Client reported error:');

    res.send({ ok: '2k' });
  })
};

module.exports = {
  init,
};
