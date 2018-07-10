// imports
const passport = require('./passport');
const { connectionString } = require('./db');
const { cookieKey } = require('./cookie');
const { stripePublishableKey, stripeSecretKey } = require('./stripe');

// exports
module.exports = {
  passport,
  connectionString,
  cookieKey,
  stripePublishableKey,
  stripeSecretKey,
};
