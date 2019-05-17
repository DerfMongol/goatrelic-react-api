const express = require('express')
const router = express.Router()

const Critics = require('../../models/Critics')

router.get('/nba', (req, res) => {
    Critics.Nba.find()
       .then(player => res.json(player))

})

router.get('/nhl', (req, res) => {
    Critics.Nhl.find()
       .then(player => res.json(player))

})

router.get('/pga', (req, res) => {
    Critics.Pga.find()
       .then(player => res.json(player))

})

module.exports = router