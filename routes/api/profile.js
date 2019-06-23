const router = require('express').Router()

const User = require('../../models/User')
const Fans = require('../../models/Fans')
const FansAllTime = require('../../models/FansAllTime')

const authCheck = (req, res, next) => {
    if (!req.user) {
        // if user is not logged in
        res.send(null)
    } else {
        // if logged in 
        next()
    }
}

router.get('/', authCheck, (req, res) => {
    res.send(req.user)
})

router.post('/', (req, res) => {

    User.findOne({ googleId: req.user.googleId }).then(currentUser => {
        Object.keys(Fans).forEach((sports) => {
            if (JSON.stringify(req.user[sports.toLocaleLowerCase()]) !== JSON.stringify(req.body[sports.toLocaleLowerCase()]) && req.body[sports.toLocaleLowerCase()].length > 0) {
                Fans[sports].findOne({ googleId: req.user.googleId }).then(fanUser => {

                    if (fanUser) {
                        fanUser.players = req.body[sports.toLocaleLowerCase()]
                        fanUser.save()
                    } else {
                        const newFan = new Fans[sports]({
                            name: currentUser.username,
                            googleId: req.user.googleId,
                            pic: currentUser.thumbnail,
                            date: new Date().toLocaleDateString(),
                            players: req.body[sports.toLocaleLowerCase()]
                        })
                        newFan.save().then(newfan => res.json(newfan))
                    }
                    fanUser.players.forEach((player, index) => {
                        FansAllTime[sports].findOne({ player: player }).then(dbPlayer => {
                            if (dbPlayer) {
                                if (!dbPlayer.googleId.includes(req.user.googleId)) {
                                    dbPlayer.googleId.push(req.user.googleId)
                                    dbPlayer.lists++
                                    dbPlayer.rank += index + 1
                                    dbPlayer.avg = parseFloat( dbPlayer.rank / dbPlayer.lists ).toFixed(2)
                                    console.log(dbPlayer)
                                    dbPlayer.save()
                                } else  {
                                    console.log(dbPlayer)
                                }
                            }
                            else {
                                const newAllTimePlayer = new FansAllTime[sports]({
                                    rank: index + 1,
                                    player: player,
                                    lists: 1,
                                    avg: (index + 1).toFixed(2),
                                    googleId: [req.user.googleId]
                                })
                                newAllTimePlayer.save()
                            }
                        })
                    })
                    // FansAllTime[sports].find({}, (err, fans) => {
                    //     console.log(fans)
                    // })
                })
            }
            currentUser[sports.toLocaleLowerCase()] = req.body[sports.toLocaleLowerCase()]

        })

        currentUser.save().then(currentUser => res.json(currentUser))
    })


})

module.exports = router