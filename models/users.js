/* Resources ====================================================================
-- https://stackoverflow.com/questions/14526207/oauth-2-0-database-structure
-- https://chartio.com/resources/tutorials/how-to-define-an-auto-increment-primary-key-in-postgresql/
*/

/* Variables ==================================================================== */
// libraries
const _ = require('lodash');

// custom
const { pool } = require('../services');

/* Models ==================================================================== */

const getUserByOauthId = async (oauthUserId) => {
  console.log(`Looking for user ${oauthUserId}`);
  const queryText = `SELECT * from users_auth WHERE oauth_user_id = '${oauthUserId}'`;
  try {
    const userResult = await pool.query(queryText);
    return userResult.rows[0];
  } catch (e) {
    throw new Error(e.message);
  }
};

const createUser = async (json) => {
  const userProps = [
    'familyName',
    'firstName',
    'emailAddress',
    'oauthUserId',
    'oauthProvider',
    'accessToken',
    'refreshToken',
    'expiryDate',
  ];
  const keyMap = {
    familyName: ['family_name', 'varchar'],
    firstName: ['first_name', 'varchar'],
    emailAddress: ['email_address', 'varchar'],
    oauthUserId: ['oauth_user_id', 'int'],
    oauthProvider: ['oauth_provider', 'varchar'],
    accessToken: ['access_token', 'varchar'],
    refreshToken: ['refresh_token', 'varchar'],
    expiryDate: ['expiry_date', 'date'],
  };
  // sanitize json object
  const userJson = _.pickBy(json, (value, key) => (_.includes(userProps, key) && !_.isNil(value)));
  const userPsql = Object.keys(userJson).reduce((accObj, key) => {
    const sqlMapInfo = keyMap[key];
    accObj.cols.push(sqlMapInfo[0]);

    if (sqlMapInfo[1] === 'int') accObj.vals.push(userJson[key]);
    else accObj.vals.push(`'${userJson[key]}'`);
    return accObj;
  }, {
    cols: [],
    vals: [],
  });

  const queryText = `INSERT INTO users_auth(${userPsql.cols.join(', ')}) values(${userPsql.vals.join(', ')})`;
  try {
    await pool.query(queryText);
    const user = await getUserByOauthId(userJson.oauthUserId);
    return user;
  } catch (e) {
    throw new Error(e.message);
  }
};

// createUser({
//   firstName: 'Chris',
//   familyName: 'Ramesh',
//   emailAddress: 'chris.ramesh@gmail.com',
//   randomShit: 'lolzz',
//   oauthUserId: 12340,
// })
//   .then(() => console.log('success!'))
//   .catch(e => console.log(e.message));

/* Create Tables ==================================================================== */
const createTableUsersAuth = () => {
  const queryText = 'CREATE TABLE users_auth(uid SERIAL PRIMARY KEY, family_name varchar(50), first_name varchar(50), email_address varchar(255), oauth_user_id char(21) CONSTRAINT oauth_id_must_be_unique UNIQUE, oauth_provider varchar(20), access_token varchar(255), refresh_token varchar(255), expiry_date timestamp, created_on date DEFAULT current_timestamp)';
  return pool.query(queryText);
};

/* Exports ==================================================================== */
module.exports = {
  createUser,
  getUserByOauthId,
  createTableUsersAuth,
};
