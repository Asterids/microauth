const router = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const { User } = require('../db')

passport.use(
  // passport's provided callback for giving us the data from Google
  new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'auth/google/verify',
  },
  // when passport successfully authenticates with the provider, the following callback is used
  // passport standardizes the data returned from the provider inside it's profile object
  (token, tokenSecret, profile, done) => {
    const googleUserData = {
      name: profile.displayName,
      email: profile.emails[0].value,
      photo: profile.photos[0].value,
    }
    User.findOrCreate({
      where: { googleId: profile.id },
      defaults: googleUserData,
    })
      .then((user) => {
        done(null, user[0]) // the user is returned as the first element in an array
      })
      .catch(done);
  })
)

router.get('/', passport.authenticate('google', { scope: 'email' }));


router.get('/verify', 
  passport.authenticate('google', {
    failureRedirect: '/',
  }), 
  (req, res) => { res.redirect('/user-info')});

module.exports = router;
