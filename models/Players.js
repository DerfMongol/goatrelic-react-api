const mongoose = require('mongoose')
const keys = require('../config/keys')

const Schema = mongoose.Schema;

const options = {
    useNewUrlParser: true,
    useFindAndModify: false 
}

const PlayerConn = mongoose.createConnection(keys.mongodb.playersURI, options)

const playerSchema = {
    googleId: String,
    name: String,
    job: String,
    date: String,
    players: [String],
    url: String,
    pic: String
}

const nbaSchema = new Schema(
    playerSchema
,{collection: 'nba'}) 
const nhlSchema = new Schema(
    playerSchema
,{collection: 'nhl'})
const pgaSchema = new Schema(
    playerSchema
,{collection: 'pga'})

module.exports = {
    Pga: PlayerConn.model('pga', pgaSchema),
    Nhl: PlayerConn.model('nhl', nhlSchema),
    Nba: PlayerConn.model('nba', nbaSchema)
} 