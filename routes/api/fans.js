const express = require('express')
const router = express.Router()

const Fans = require('../../models/Fans')

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


module.exports = router