/* Variables ==================================================================== */
// libraries
const passport = require('passport');

/* Export Routes ==================================================================== */
module.exports = (routes) => {
  routes.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });

  // google
  // note: this route goes to google signup each time if multiple goog accounts are signed in
  routes.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
  }));
  routes.get('/auth/google/callback', passport.authenticate('google'));

  // slack

  // resolved
  routes.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
