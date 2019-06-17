const router = require('express').Router()
const User = require('../../models/User')
const Fans = require('../../models/Fans')

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
            Fans[sports].findOne({ googleId: req.user.googleId }).then(fanUser => {
                if (fanUser) {
                    fanUser.players = req.body[sports.toLocaleLowerCase()]
                    
                } else {
                    const newFan = new Fans[sports]({
                        name: currentUser.username,
                        googleId: req.user.googleId,
                        pic: currentUser.thumbnail,
                        date: new Date().toLocaleDateString(),
                        players: req.body[sports.toLocaleLowerCase()]
                    })
                    newFan.save()
                }
                fanUser.save()

            })
            currentUser[sports.toLocaleLowerCase()] = req.body[sports.toLocaleLowerCase()]
        })
        
        currentUser.save().then(currentUser => res.json(currentUser))
    })

})

module.exports = router