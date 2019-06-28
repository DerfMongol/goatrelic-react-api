const keys = require('../config/keys')
const Profile = require('./structure/Profile')

const CriticConn = Profile.Conn(keys.mongodb.criticsURI)

module.exports = {
    Pga: CriticConn.model('pga', Profile.Pga),
    Nhl: CriticConn.model('nhl', Profile.Nhl),
    Nba: CriticConn.model('nba', Profile.Nba),
} 



