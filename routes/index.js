/* Variables ==================================================================== */
// libraries
const routes = require('express').Router();

// custom
const {
  createUser,
  createTableUsersAuth,
} = require('../models');

/* Routes ==================================================================== */

// root
routes.get('/', (req, res) => res.status(200).send('Hello world'));

// auth
require('./authRoutes')(routes);

// writing
routes.get('/testWrite', (req, res) => {
  createTableUsersAuth()
    .then(() => {
      console.log('Successfully added user_auth table');
      res.send({
        message: 'Successfully added user_auth table',
      });
    })
    .catch((e) => {
      console.log(`Error: ${e.message}`);
      res.status(400).send({
        message: `Error: ${e.message}`,
      });
    });
});

routes.post('/testNewUser', (req, res) => {
  const { userInfo } = req.body;
  createUser(userInfo)
    .then(() => res.send('success!'))
    .catch(e => res.send(e.message));
});

/* Export ==================================================================== */
module.exports = routes;
