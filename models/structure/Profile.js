const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const options = {
    useNewUrlParser: true,
    useFindAndModify: false 
}

const criticSchema = {
    googleId: String,
    name: String,
    job: String,
    date: String,
    players: [String],
    url: String,
    pic: String
}

module.exports = {
    Conn: (key) => mongoose.createConnection(key, options),
    Pga: new Schema(criticSchema,{collection: 'pga'}),
    Nhl: new Schema(criticSchema,{collection: 'nhl'}),
    Nba: new Schema(criticSchema,{collection: 'nba'}) 
} 
