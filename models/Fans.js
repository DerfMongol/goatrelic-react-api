const mongoose = require('mongoose')
const Schema = mongoose.Schema

const keys = require('../config/keys')

const options = {
    useNewUrlParser: true,
    useFindAndModify: false 
}

const FansConn = mongoose.createConnection(keys.mongodb.fansURI, options)

const fanSchema = {
    googleId: String,
    name: String,
    job: String,
    date: String,
    players: [String],
    url: String,
    pic: String
}

const nbaSchema = new Schema(
    fanSchema
,{collection: 'nba'}) 
const nhlSchema = new Schema(
    fanSchema
,{collection: 'nhl'})
const pgaSchema = new Schema(
    fanSchema
,{collection: 'pga'})

module.exports = {
    Pga: FansConn.model('pga', pgaSchema),
    Nhl: FansConn.model('nhl', nhlSchema),
    Nba: FansConn.model('nba', nbaSchema)
} 

