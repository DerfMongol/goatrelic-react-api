const express = require('express')
const router = express.Router()

const Fans = require('../../models/Fans')
const findAllTime = require('../functions/findAllTime')


router.get('/nba', (req, res) => {
    Fans.Nba.find({}).then((fans) => {
        res.json(findAllTime(fans))
    })

})

router.get('/nhl', (req, res) => {
    Fans.Nhl.find({}).then((fans) => {
        res.json(findAllTime(fans))
    })

})

router.get('/pga', (req, res) => {
    Fans.Pga.find({}).then((fans) => {
        res.json(findAllTime(fans))
    })
})

module.exports = router