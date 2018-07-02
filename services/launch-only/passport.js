/* Variables ==================================================================== */
// libraries
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// custom

// constants
const {
  AUTH_GOOGLE_CLIENT_ID,
  AUTH_GOOGLE_CLIENT_SECRET,
} = process.env;

/* Service ==================================================================== */

passport.use(new GoogleStrategy(
  {
    clientID: AUTH_GOOGLE_CLIENT_ID,
    clientSecret: AUTH_GOOGLE_CLIENT_SECRET,
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
