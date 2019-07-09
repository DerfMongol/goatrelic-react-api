const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieSession = require('cookie-session')
const passport = require('passport')
const axios = require('axios')

const passportSetup = require('./config/passport-setup')
const keys = require('./config/keys')
const critic = require('./routes/api/critics')
const allTime = require('./routes/api/allTime')
const auth = require('./routes/api/auth')
const profile = require('./routes/api/profile')
const users = require('./routes/api/users')
const fans = require('./routes/api/fans')
const fansAllTime = require('./routes/api/fansAllTime')
const players = require('./routes/api/players')
const playersAllTime = require('./routes/api/playersAllTime')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.use(cookieSession({
    keys: [keys.session.cookieKey],
    maxAge: 24 * 60 * 60 * 1000
}))
app.use(passport.initialize())
app.use(passport.session())

// Set up view engine
app.set('view engine', 'ejs')

console.log(keys)

if (process.env.NODE_ENV == 'production') {
    setInterval(() => {
        axios.get("http://goatrelic.herokuapp.com");
    }, 300000); // every 5 minutes (300000)
}

require('./routes/api/auth')(app);

app.use('/critics', critic)
app.use('/allTime', allTime)
app.use('/profile', profile)
app.use('/users', users)
app.use('/fans', fans)
app.use('/fansAllTime', fansAllTime)
app.use('/players', players)
app.use('/playersAlltime', playersAllTime)

app.get('/', (req, res) => {
    res.render('home', { user: req.user })
})

app.listen(keys.port, () => console.log(`Example app listening on port ${keys.port}!`))