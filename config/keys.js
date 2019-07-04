const Secret = require('./secret')

let config = {}

if (process.env.NODE_ENV == 'development') {
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
        }
    }

}
console.log(config)

module.exports = config

   

