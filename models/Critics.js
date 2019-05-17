const mongoose = require('mongoose')
const keys = require('../config/keys')

const Schema = mongoose.Schema;

const options = {
    useNewUrlParser: true
}

const CriticConn = mongoose.createConnection(keys.mongodb.criticsURI, options)

const nbaSchema = new Schema({ url: String, text: String, id: Number}, { collection: 'nba'})
const nhlSchema = new Schema({ url: String, text: String, id: Number}, { collection: 'nhl'})
const pgaSchema = new Schema({ url: String, text: String, id: Number}, { collection: 'pga'})

module.exports = {
    Pga: CriticConn.model('pga', pgaSchema),
    Nhl: CriticConn.model('nhl', nhlSchema),
    Nba: CriticConn.model('nba', nbaSchema)
} 



