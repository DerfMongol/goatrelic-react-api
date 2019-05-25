const router = require('express').Router()
const User = require('../../models/User')

const authCheck = (req, res, next) => {
    if(!req.user){
        // if user is not logged in
        res.send(null)
    } else {
        // if logged in 
        next()
    }
}

router.get('/', authCheck, (req,res) => {
    res.send(req.user)
})

router.post('/', (req, res) => {
    User.findOne({ googleId: req.user.googleId }).then((currentUser) => {

        currentUser.nba = req.body.nba
        currentUser.nhl = req.body.nhl
        currentUser.pga = req.body.pga

        console.log(req.body)
        currentUser.save().then(currentUser => res.json(currentUser))
    })
})

module.exports = router