const router = require('express').Router()

const User = require('../../models/User')
const Fans = require('../../models/Fans')

const authCheck = (req, res, next) => {
    console.log(`authCheck: ${req.body}`)
    if (!req.body.user) {
        // if user is not logged in
        res.send(null)
    } else {
        // if logged in 
        next()
    }
}

router.get('/', authCheck, (req, res) => {
    res.send(req.body.user)
})

router.post('/', (req, res) => {

    User.findOne({ googleId: req.user.googleId }).then(currentUser => {
        Object.keys(Fans).forEach((sports) => {
            if (JSON.stringify(req.user[sports.toLocaleLowerCase()]) !==
                JSON.stringify(req.body[sports.toLocaleLowerCase()]) &&
                req.body[sports.toLocaleLowerCase()].length > 0) {
                Fans[sports].findOneAndUpdate(
                    { googleId: req.user.googleId }, {
                        players: req.body[sports.toLocaleLowerCase()],
                        date: new Date().toLocaleDateString()
                    }).then(fanUser => {
                        if (fanUser) {
                            console.log(fanUser)
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
                    })
            }
            currentUser[sports.toLocaleLowerCase()] = req.body[sports.toLocaleLowerCase()]
        })

        currentUser.save().then(currentUser => res.json(currentUser))
    })
})

module.exports = router