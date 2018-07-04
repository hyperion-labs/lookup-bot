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

const createUser = (json) => {
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
    familyName: [ 'family_name', 'varchar'],
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
  return pool.query(queryText);
};

// createUser({
  // firstName: 'Chris',
  // familyName: 'Ramesh',
  // emailAddress: 'chris.ramesh@gmail.com',
  // randomShit: 'lolzz',
  // oauthUserId: 1234,
// });

/* Create Tables ==================================================================== */
const createTableUsersAuth = () => {
  const queryText = 'CREATE TABLE users_auth(uid SERIAL PRIMARY KEY, family_name varchar(50), first_name varchar(50), email_address varchar(255), oauth_user_id bigint CONSTRAINT oauth_id_must_be_unique UNIQUE, oauth_provider varchar(20), access_token varchar(40), refresh_token varchar(40), expiry_date timestamp, created_on date DEFAULT current_timestamp)';
  return pool.query(queryText);
};

/* Exports ==================================================================== */
module.exports = {
  createUser,
  createTableUsersAuth,
};
