const express = require('express')
const router = express.Router()

const Players= require('../../models/Players')
const findAllTime = require('../functions/findAllTime')


router.get('/nba', (req, res) => {
    Players.Nba.find({}).then((players) => {
        res.json(findAllTime(players))
    })

})

router.get('/nhl', (req, res) => {
    Players.Nhl.find({}).then((players) => {
        res.json(findAllTime(players))
    })

})

router.get('/pga', (req, res) => {
    Players.Pga.find({}).then((players) => {
        res.json(findAllTime(players))
    })
})



module.exports = router