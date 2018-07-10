/* Variables ==================================================================== */
// libraries
const _ = require('lodash');

// custom
const { pool } = require('../services');

/* Models ==================================================================== */
const createPayment = async ({ uid, amount }) => {
  if (_.isNil(uid)) throw new Error(`Uid of ${uid} is not valid.`);
  if (_.isNil(amount)) throw new Error(`Payment amount of ${amount} is not valid.`);

  const queryText = `INSERT INTO payments(uid, amount) values(${uid}, ${amount})`;
  try {
    await pool.query(queryText);
    return { uid, amount };
  } catch (e) {
    throw new Error(e.message);
  }
};

const getTotalPaymentsForUid = async (uid) => {
  if (_.isNil(uid)) throw new Error(`Uid of ${uid} is not valid.`);

  const queryText = `SELECT uid, COUNT(amount) as count, SUM(amount) as sum FROM payments WHERE uid=${uid} GROUP BY 1;`;
  const res = await pool.query(queryText);
  const resPaymentInfo = {
    uid: res.rows[0] ? res.rows[0].uid : parseInt(uid, 10),
    count: res.rows[0] ? res.rows[0].count : '0',
    sum: res.rows[0] ? res.rows[0].sum : '$0.00',
  };
  return resPaymentInfo;
};

/* Create Tables ==================================================================== */
const createTablePayments = () => {
  const queryText = 'CREATE TABLE payments(payment_id SERIAL PRIMARY KEY, uid integer REFERENCES users_auth ON DELETE CASCADE, amount money, transaction_date date DEFAULT current_timestamp)';
  return pool.query(queryText);
};

/* Exports ==================================================================== */
module.exports = {
  createPayment,
  createTablePayments,
  getTotalPaymentsForUid,
};
