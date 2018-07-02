/* Variables ==================================================================== */
// libraries
const passport = require('passport');

/* Export Routes ==================================================================== */
module.exports = (routes) => {
  routes.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
  }));
  routes.get('/auth/google/callback', passport.authenticate('google'));
};
