let path = require('path');
let winston = require('winston');

let {createLogger, format, transports} = winston;

let transportModes = [new transports.Console({
  format: format.combine(
    format.timestamp(),
    format.colorize(),
    format.simple()
  )
})];

let logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.simple()
  ),
  transports: transportModes,
  silent: true
});

module.exports = logger;
