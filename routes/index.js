/* Resources
-- https://stackoverflow.com/questions/25260818/rest-with-express-js-nested-router
*/

/* Variables ==================================================================== */
// libraries
const express = require('express');

/* Routes ==================================================================== */

// root
const routes = express.Router();
routes.get('/', (req, res) => res.status(200).send('Hello world'));

// auth
const authRoutes = express.Router({ mergeParams: true });
routes.use('/auth', authRoutes);
require('./authRoutes')(authRoutes);

// writing
const apiUserRoutes = express.Router({ mergeParams: true });
routes.use('/api/v1', apiUserRoutes);
require('./userRoutes')(apiUserRoutes);

/* Export ==================================================================== */
module.exports = routes;
