const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('./keys')
const User = require('../models/User')
const Fans = require('../models/Fans')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    })
})

passport.use(
    new GoogleStrategy({
        // options for the google strategy
        callbackURL: '/api/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret, 
        proxy: true
    }, (accessToken, refreshToken, profile, done) => {
        User.findOneAndUpdate({ googleId: profile.id }, {thumbnail: profile._json.picture}).then((currentUser) => {
            if (currentUser) {
                done(null, currentUser)
            } else {
                new User({
                    username: profile.displayName,
                    googleId: profile.id,
                    thumbnail: profile._json.picture
                }).save().then((newUser) => {
                    done(null, newUser)
                })
            }
        })
    })
)

