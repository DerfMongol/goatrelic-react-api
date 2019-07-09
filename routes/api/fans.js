const express = require('express')
const router = express.Router()

const Fans = require('../../models/Fans')
const User = require('../../models/User')

router.get('/nba', (req, res) => {
    Fans.Nba.find()
        .then(player => res.json(player))

})

router.get('/nhl', (req, res) => {
    Fans.Nhl.find()
        .then(player => res.json(player))

})

router.get('/pga', (req, res) => {
    Fans.Pga.find()
        .then(player => res.json(player))

})

router.delete('/', (req, res) => {
    Fans[req.body.sport].findOne({ googleId: req.body.id }).then((doc) => {
        console.log(doc)
        Fans[req.body.sport].findByIdAndRemove(doc._id, (err, fan) => {
            console.log(fan)
            if (err)
                res.send(err);
            else
                User.findOne({googleId: req.body.id}).then((user) => {
                    user[req.body.sport.toLowerCase()] = []
                    user.save()
                })
                res.json({ id: doc._id, sport: req.body.sport.toLowerCase() });
                res.status(200).send()
        })
    })
})


module.exports = router