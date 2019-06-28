const keys = require('../config/keys')
const Profile = require('./structure/Profile')

const PlayersConn = Profile.Conn(keys.mongodb.playersURI)

module.exports = {
    Pga: PlayersConn.model('pga', Profile.Pga),
    Nhl: PlayersConn.model('nhl', Profile.Nhl),
    Nba: PlayersConn.model('nba', Profile.Nba),
} 