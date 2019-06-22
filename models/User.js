const mongoose = require('mongoose')
const Schema = mongoose.Schema

const keys = require('../config/keys')

const options = {
    useNewUrlParser: true,
    useFindAndModify: false 
}

const UserConn = mongoose.createConnection(keys.mongodb.usersURI, options)

const userSchema = new Schema({
    username: String,
    googleId: String,
    thumbnail: String,
    nba: [String],
    nhl: [String],
    pga: [String]
})

const User = UserConn.model("user", userSchema)

module.exports = User