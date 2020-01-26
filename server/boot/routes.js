let Promise = require('bluebird');
let LoopBackContext = require('loopback-context');

module.exports = function (app) {

  let router = app.loopback.Router();

  router.get('/api/terminalAction', function (req, res) {
    res.status(200).send('');
  });

};
