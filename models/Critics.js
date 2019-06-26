const mongoose = require('mongoose')
const keys = require('../config/keys')

const Schema = mongoose.Schema;

const options = {
    useNewUrlParser: true,
    useFindAndModify: false 
}

const CriticConn = mongoose.createConnection(keys.mongodb.criticsURI, options)

const criticSchema = {
    googleId: String,
    name: String,
    job: String,
    date: String,
    players: [String],
    url: String,
    pic: String
}

const nbaSchema = new Schema(
    criticSchema
,{collection: 'nba'}) 
const nhlSchema = new Schema(
    criticSchema
,{collection: 'nhl'})
const pgaSchema = new Schema(
    criticSchema
,{collection: 'pga'})

module.exports = {
    Pga: CriticConn.model('pga', pgaSchema),
    Nhl: CriticConn.model('nhl', nhlSchema),
    Nba: CriticConn.model('nba', nbaSchema)
} 



