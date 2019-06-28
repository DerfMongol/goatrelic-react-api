const keys = require('../config/keys')
const Profile = require('./structure/Profile')

const FansConn = Profile.Conn(keys.mongodb.fansURI)

module.exports = {
    Pga: FansConn.model('pga', Profile.Pga),
    Nhl: FansConn.model('nhl', Profile.Nhl),
    Nba: FansConn.model('nba', Profile.Nba),
} 

