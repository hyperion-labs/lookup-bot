const {
  createUser,
  getUserByUid,
  getUserByOauthId,
  createTableUsersAuth,
} = require('./users');

const {
  createTablePayments,
  createPayment,
  getTotalPaymentsForUid,
} = require('./payments');

module.exports = {
  // users
  createUser,
  getUserByUid,
  getUserByOauthId,
  createTableUsersAuth,
  // payments
  createPayment,
  createTablePayments,
  getTotalPaymentsForUid,
};
