/* Resources ====================================================================
-- https://stackoverflow.com/questions/14526207/oauth-2-0-database-structure
-- https://chartio.com/resources/tutorials/how-to-define-an-auto-increment-primary-key-in-postgresql/
*/

/* Variables ==================================================================== */
// custom
const { pool } = require('../services');

/* Models ==================================================================== */


/* Create Tables ==================================================================== */
const createTableUsersAuth = () => {
  const queryText = 'CREATE TABLE users_auth(uid SERIAL PRIMARY KEY, oauth_user_id bigint, oauth_provider varchar(20), access_token varchar(40), refresh_token varchar(40), expiry_date timestamp, created_on date DEFAULT current_timestamp)';
  return pool.query(queryText);
};

/* Exports ==================================================================== */
module.exports = {
  createTableUsersAuth,
};
