/* Variables ==================================================================== */
const { Pool } = require('pg');
const { connectionString } = require('../config');

/* database ==================================================================== */
// comment this out when deploying to production
const poolConfigDev = {
  connectionString: 'postgresql://localhost:5432/lookup_bot',
  ssl: false,
};
console.log('Running db in local dev mode');

const poolConfigProd = {
  connectionString,
  ssl: true,
};
const poolConfig = poolConfigDev || poolConfigProd;

const pool = new Pool(poolConfig);

/* exports ==================================================================== */
module.exports = { pool };
