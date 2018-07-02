/* Variables ==================================================================== */
// libraries
const routes = require('express').Router();

/* Routes ==================================================================== */

// root
routes.get('/', (req, res) => res.status(200).send('Hello world'));

// auth
require('./authRoutes')(routes);

/* Export ==================================================================== */
module.exports = routes;
