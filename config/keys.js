let config = {}

if (process.env.NODE_ENV == 'development') {
    const Secret = require('./secret')
    config = Secret
} else if (process.env.NODE_ENV == 'production') {
    config = {
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
        },
        frontDomain: 'goatrelic.herokuapp.com'
    }

}

module.exports = config

   

