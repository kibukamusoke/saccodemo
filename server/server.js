'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
let bodyParser = require('body-parser');
let expressWinston = require('express-winston');
let compression = require('compression');
let logger = require('../utilities/logger');

var app = module.exports = loopback();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(compression());


let loggerX = function (req, res, next) {
  console.log('req.accessToken = ' + JSON.stringify(req.accessToken, null, 2));
  console.log('headers = ' + JSON.stringify(req.headers, null, 2));
  console.log('body = ' + JSON.stringify(req.body, null, 2));
  console.log('query = ' + JSON.stringify(req.query, null, 2));
  console.log('params = ' + JSON.stringify(req.params, null, 2));
  next(); // pass the request to the next handler in the stack ::
};
app.use(loggerX);


app.use(expressWinston.logger({ // use logger to log every requests
  transports: [logger],
  meta: false, // optional: control whether you want to log the meta data about the request (default to true)
  msg: `{{req.ip}} - {{res.statusCode}} - {{req.method}} - {{res.responseTime}}ms - {{req.url}} - {{req.headers['user-agent']}}`, // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: false, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: true
}));


app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
