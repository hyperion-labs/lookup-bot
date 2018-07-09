/* Variables ==================================================================== */
// libraries
const passport = require('passport');

/* Export Routes ==================================================================== */

// coming from '/auth'
module.exports = (router) => {
  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  // google
  // note: this route goes to google signup each time if multiple goog accounts are signed in
  router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
  }));
  router.get(
    '/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    },
  );

  // slack

  // resolved
  router.get('/current_user', (req, res) => {
    res.send(req.user);
  });
};
