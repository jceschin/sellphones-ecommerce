const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
const { User } = require("./db.js");
const jwt = require("jsonwebtoken");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var GitHubStrategy = require('passport-github2').Strategy;

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password", session: false },
    async (email, password, done) => {
      const user = await User.findOne({ where: { email: email } });
      if (!user) return done(null, false);
      if (!user.compare(password)) return done(null, false);
      const {
        id,
        givenName,
        familyName,
        email: userEmail,
        photoURL,
        isAdmin,
      } = user;
      return done(null, {
        id,
        givenName,
        familyName,
        email: userEmail,
        photoURL,
        isAdmin,
      });
    }
  )
);


passport.use(new GitHubStrategy({
    clientID: '0945ab890e97699e68dd',
    clientSecret: '197a8cbda31e4e39d41427ffd24baceb5cb50a7f',
    callbackURL: "http://localhost:4000/auth/github/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {

      const userFound = await User.findOne({
        where: {
          githubId: profile.id,
        },
      });

      if (!userFound) {
        
        const newUser = await User.create({
          givenName: profile.username,
          familyName: null,
          email: null,
          password : null,
          githubId: profile.id
        });
        return done(null, newUser);
      }
      return done(null, userFound.dataValues);
    } catch (e) {
      return console.error(e);
    }
  }
));

passport.use(new GoogleStrategy({
  clientID: '469420223233-c04s1iddkpa285d82hervlk7fuarjgrn.apps.googleusercontent.com',
  clientSecret: 'phsaxbxFslnchCVHFq7Oc8Ls',
  callbackURL: 'http://localhost:4000/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {

    const userFound = await User.findOne({
      where: {
        googleId: profile.id,
      },
    });

    if (!userFound) {
      const newUser = await User.create({
        givenName: profile.name.givenName,
        familyName: profile.name.familyName,
        email: profile.emails[0].value,
        password : null,
        googleId: profile.id
      });
      return done(null, newUser);
    }
    return done(null, userFound.dataValues);
  } catch (e) {
    return console.error(e);
  }
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


passport.use(
  new BearerStrategy((token, done) => {
    jwt.verify(token, "secreto", function (err, user) {
      if (err) return done(err);
      return done(null, user ? user : false);
    });
  })
);

module.exports = passport;
