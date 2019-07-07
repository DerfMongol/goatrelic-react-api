const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('./keys')
const User = require('../models/User')
const Fans = require('../models/Fans')

passport.serializeUser((user, done) => {
    console.log(`serialize: ${user}`)

    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    console.log(`deserialize: ${id}`)
    User.findById(id).then((user) => {
        console.log(`deserialize: ${user}`)
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
        User.findOne({ googleId: profile.id }).then((currentUser) => {
            if (currentUser) {
                console.log(`verify: ${currentUser}`)
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

