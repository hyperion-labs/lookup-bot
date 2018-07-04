/* Variables ==================================================================== */
// libraries
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// custom
const { clientID, clientSecret } = require('../../config').passport;
const { createUser, getUserByOauthId } = require('../../models');

/* Service ==================================================================== */

passport.use(new GoogleStrategy(
  {
    clientID,
    clientSecret,
    callbackURL: '/auth/google/callback',
  },
  async (accessToken, refreshToken, profile) => {
    const { familyName } = profile.name;
    const firstName = profile.name.givenName;
    const emailAddress = profile.emails[0].type === 'account' ? profile.emails[0].value : null;
    const oauthUserId = profile.id;
    const oauthProvider = 'google';

    try {
      console.log(`Attempting signup for ${emailAddress}, google id(${oauthUserId})`);
      const user = await createUser({
        familyName,
        firstName,
        oauthUserId,
        oauthProvider,
        emailAddress,
        accessToken,
        refreshToken,
      });
      console.log(`Successfully created new user for ${user.email_address} with id of ${user.uid}`);
      return user;
    } catch (e) {
      console.log(`Error: ${e.message}`);
      try {
        const user = await getUserByOauthId(oauthUserId);
        console.log(`User ${user.uid} exists and has signed in`);
        return user;
      } catch (err) {
        console.log(`Error: ${err.message}`);
        // note: this error, when thrown, isn't being handled as passport is calling this
        throw new Error(err.message);
      }
    }
  },
));

/* Exports ==================================================================== */
// nothing to export, just need to run this
console.log('Executing service passport.js');
