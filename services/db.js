/* Variables ==================================================================== */
const { Pool } = require('pg');
const { connectionString } = require('../config');

/* database ==================================================================== */
// comment this out when deploying to production
let poolConfig;

if (process.env.NODE_ENV === 'production') {
  poolConfig = {
    connectionString,
    ssl: true,
  };
} else {
  console.log('Running db in local dev mode');
  poolConfig = {
    connectionString,
    ssl: false,
  };
}

const pool = new Pool(poolConfig);

/* exports ==================================================================== */
module.exports = { pool };
