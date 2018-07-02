/*
Resources:
-- Good project setup https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize
-- https://scotch.io/tutorials/keeping-api-routing-clean-using-express-routers
-- Another postgres sql project setup: http://mherman.org/blog/2015/02/12/postgresql-and-nodejs/
-- good example on github: https://github.com/expressjs/express/blob/master/examples/route-separation/index.js
-- modular routing: https://expressjs.com/en/guide/routing.html

++ directory structure
-- https://www.terlici.com/2014/08/25/best-practices-express-structure.html
*/

/* Variables ==================================================================== */
// libraries
const express = require('express');
const bodyParser = require('body-parser');

// custom
const routes = require('./routes');

// constants
const port = process.env.port || 5000;

/* App ==================================================================== */
const app = express();

// middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`\n+++Request received+++\nMethod: ${req.method}\nurl: ${req.url}\nbody: ${JSON.stringify(req.body, null, 2)}`);
  next();
});

// connect app to routes
app.use('/', routes);

// turns on the server;
app.listen(port, () => console.log(`Listening on port ${port}.`));
