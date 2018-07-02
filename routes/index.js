/* Variables ==================================================================== */
// libraries
const routes = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// custom

// constants
const {
  AUTH_GOOGLE_CLIENT_ID,
  AUTH_GOOGLE_CLIENT_SECRET,
} = process.env;

/* Routes ==================================================================== */

// root
routes.get('/', (req, res) => res.status(200).send('Hello world'));

// auth
passport.use(new GoogleStrategy(
  {
    clientID: AUTH_GOOGLE_CLIENT_ID,
    clientSecret: AUTH_GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  },
  (accessToken, refreshToken, profile, done) => {
    console.log('ACCESS token', accessToken);
    console.log('REFRESH token', refreshToken);
    console.log('profile', profile);
  },
));

routes.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

routes.get('/auth/google/callback', passport.authenticate('google'));

/* Export ==================================================================== */
module.exports = routes;
