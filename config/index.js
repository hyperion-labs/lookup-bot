// imports
const passport = require('./passport');
const { connectionString } = require('./db');
const { cookieKey } = require('./cookie');

// exports
module.exports = {
  passport,
  connectionString,
  cookieKey,
};
