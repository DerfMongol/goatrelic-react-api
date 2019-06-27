const express = require('express')
const router = express.Router()

const Players = require('../../models/Players')

router.get('/nba', (req, res) => {
    Players.Nba.find()
       .then(player => res.json(player))

})

router.get('/nhl', (req, res) => {
    Players.Nhl.find()
       .then(player => res.json(player))

})

router.get('/pga', (req, res) => {
    Players.Pga.find()
       .then(player => res.json(player))

})

module.exports = router