/* Variables ==================================================================== */
const { Pool } = require('pg');
const { connectionString } = require('../config');

/* database ==================================================================== */
const pool = new Pool({ 
  connectionString,
  ssl: true,
});

/* exports ==================================================================== */
module.exports = { pool };
