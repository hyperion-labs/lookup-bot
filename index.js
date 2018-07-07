/*
Resources:
-- Good project setup https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize
-- https://scotch.io/tutorials/keeping-api-routing-clean-using-express-routers
-- Another postgres sql project setup: http://mherman.org/blog/2015/02/12/postgresql-and-nodejs/
-- good example on github: https://github.com/expressjs/express/blob/master/examples/route-separation/index.js
-- modular routing: https://expressjs.com/en/guide/routing.html

++ directory structure
-- https://www.terlici.com/2014/08/25/best-practices-express-structure.html

++ database stuff
-- knex: https://hackernoon.com/setting-up-node-js-with-a-database-part-1-3f2461bdd77f
-- https://gist.github.com/NigelEarle/80150ff1c50031e59b872baf0e474977
-- https://gist.github.com/laurenfazah/e0b0033cdc40a313d4710cc04e654556
-- https://www.quora.com/How-do-I-use-a-MySQL-pool-in-multiple-files-with-Node-js

*/

/* Variables ==================================================================== */
// libraries
const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');

// custom
require('./services/launch-only');
const { cookieKey } = require('./config');
const routes = require('./routes');

// constants
const port = process.env.PORT || 5000;

/* App ==================================================================== */
const app = express();

// middleware
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  keys: [cookieKey],
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`\n+++Request received+++\nMethod: ${req.method}\nurl: ${req.url}\nbody: ${JSON.stringify(req.body, null, 2)}`);
  next();
});

// connect app to routes
app.use('/', routes);

// turns on the server;
app.listen(port, () => console.log(`Listening on port ${port}.`));
