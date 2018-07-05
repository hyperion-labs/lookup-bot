/* Variables ==================================================================== */
// custom
const {
  createUser,
  createTableUsersAuth,
} = require('../models');

/* Export Routes ==================================================================== */
module.exports = (router) => {
  router.get('/createUserTable', (req, res) => {
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

  router.post('/createUser', (req, res) => {
    const { userInfo } = req.body;
    createUser(userInfo)
      .then(() => res.send('success!'))
      .catch(e => res.send(e.message));
  });
};
