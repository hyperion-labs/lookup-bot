/* Variables ==================================================================== */
// libraries
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// custom
const { clientID, clientSecret } = require('../../config').passport;

/* Service ==================================================================== */

passport.use(new GoogleStrategy(
  {
    clientID,
    clientSecret,
    callbackURL: '/auth/google/callback',
  },
  (accessToken, refreshToken, profile) => {
    console.log('ACCESS token', accessToken);
    console.log('REFRESH token', refreshToken);
    console.log('profile', profile);
  },
));

/* Exports ==================================================================== */
// nothing to export, just need to run this
console.log('Executing service passport.js');
