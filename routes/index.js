/* Variables ==================================================================== */
// libraries
const routes = require('express').Router();

// custom

// constants

/* Routes ==================================================================== */

// root
routes.get('/', (req, res) => res.status(200).send('Hello world'));

/* Export ==================================================================== */
module.exports = routes;
