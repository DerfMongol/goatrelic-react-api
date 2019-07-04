const aws = require('aws-sdk');

module.exports = new aws({
    google: {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET
    },
    mongodb: {
        criticsURI: process.env.CRITICS_URI,
        usersURI: process.env.USERS_URI,
        fansURI: process.env.FANS_URI,
        playersURI: process.env.PLAYERS_URI
    },
    session: {
        cookieKey: process.env.COOKIE_KEY
    }
})

console.log(process.env.GOOGLE_ID)