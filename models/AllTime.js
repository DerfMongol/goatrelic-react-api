const mongoose = require('mongoose')
const keys = require('../config/keys')

const Schema = mongoose.Schema;

const options = {
    useNewUrlParser: true,
    useFindAndModify: false 
}

const AllTimeConn = mongoose.createConnection(keys.mongodb.allTimeURI, options)

const nbaSchema = new Schema({id: Number, player: String, rank: Number, lists: Number, avg: String}, { collection: 'nba'})
const nhlSchema = new Schema({id: Number, player: String, rank: Number, lists: Number, avg: String}, { collection: 'nhl'})
const pgaSchema = new Schema({id: Number, player: String, rank: Number, lists: Number, avg: String}, { collection: 'pga'})


module.exports = {
    Pga: AllTimeConn.model('pga', pgaSchema),
    Nhl: AllTimeConn.model('nhl', nhlSchema),
    Nba: AllTimeConn.model('nba', nbaSchema)
} 