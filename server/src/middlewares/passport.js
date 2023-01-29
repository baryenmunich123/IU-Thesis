const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const { db } = require("../../db.js");
require("dotenv").config();

//passport google
module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, cb) => {
        const snapshot = await db.collection("user").get();
        let data;
        snapshot.forEach((doc) => {
          if (doc.data().id == profile.id) {
            data = doc.data();
          }
        });
        if (data) {
          return cb(null, data);
        } else {
          await db.collection("user").add({
            name: profile.displayName,
            email: profile.emails[0].value,
            id: profile.id,
            avatar: profile.photos[0].value,
          });
          profile.accessToken = accessToken;
          console.log(accessToken);
          return cb(null, profile);
        }
      }
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "/auth/facebook/callback",
        profileFields: [
          "id",
          "displayName",
          "name",
          "picture.type(large)",
          "email",
        ],
      },
      async (accessToken, refreshToken, profile, cb) => {
        const snapshot = await db.collection("user").get();
        let data;
        snapshot.forEach((doc) => {
          if (doc.data().id == profile.id) {
            data = doc.data();
          }
        });
        if (data) {
          return cb(null, data);
        } else {
          await db.collection("user").add({
            name: profile.displayName,
            email: profile.emails[0].value,
            id: profile.id,
            avatar: profile.photos[0].value,
          });
          profile.accessToken = accessToken;
          console.log(accessToken);
          return cb(null, profile);
        }
      }
    )
  );

  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });
};
