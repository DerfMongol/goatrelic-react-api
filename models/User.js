const mongoose = require('mongoose')
const Schema = mongoose.Schema

const keys = require('../config/keys')

mongoose.connect(keys.mongodb.usersURI, {useNewUrlParser: true}, () => {
    console.log('connected to mongodb')
})


const userSchema = new Schema({
    username: String,
    googleId: String,
    token: String
})

const User = mongoose.model("user", userSchema)

module.exports = User