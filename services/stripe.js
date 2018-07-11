/* Variables ==================================================================== */
/* eslint-disable */
const { stripeSecretKey } = require('../config');
const stripe = require('stripe')(stripeSecretKey);
/* eslint-enable */

/* exports ==================================================================== */
module.exports = { stripe };
