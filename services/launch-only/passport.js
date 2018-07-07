/* Variables ==================================================================== */
// libraries
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// custom
const { clientID, clientSecret } = require('../../config').passport;
const { createUser, getUserByUid, getUserByOauthId } = require('../../models');

/* Service ==================================================================== */

passport.serializeUser((user, done) => {
  console.log(`serialize user ${user.uid}`);
  done(null, user.uid);
});

passport.deserializeUser(async (uid, done) => {
  console.log(`deserialize user ${uid}`);
  const user = await getUserByUid(uid);
  done(null, user);
});

passport.use(new GoogleStrategy(
  {
    clientID,
    clientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true,
  },
  async (accessToken, refreshToken, profile, done) => {
    // user information from googl auth
    const { familyName } = profile.name;
    const firstName = profile.name.givenName;
    const emailAddress = profile.emails[0].type === 'account' ? profile.emails[0].value : null;
    const oauthUserId = profile.id;
    const oauthProvider = 'google';

    const existingUser = await getUserByOauthId(oauthUserId);

    if (existingUser) {
      console.log(`Found existing user with id ${existingUser.uid} (${existingUser.email_address})`);
      return done(null, existingUser);
    }

    const newUser = await createUser({
      familyName,
      firstName,
      oauthUserId,
      oauthProvider,
      emailAddress,
      accessToken,
      refreshToken,
    });
    console.log(`Successfully created new user with id ${newUser.uid} (${newUser.email_address})`);
    return done(null, newUser);
  },
));

/* Exports ==================================================================== */
// nothing to export, just need to run this
console.log('Executing service passport.js');
