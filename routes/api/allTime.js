const express = require('express')
const router = express.Router()

const Critics = require('../../models/Critics')
const findAllTime = require('../functions/findAllTime')

router.get('/nba', (req, res) => {
    Critics.Nba.find({}).then((critics) => {
            res.json(findAllTime(critics))

        })
})
router.get('/nhl', (req, res) => {
    Critics.Nhl.find({}).then((critics) => {
            res.json(findAllTime(critics))

        })
})
router.get('/pga', (req, res) => {
    Critics.Pga.find({}).then((critics) => {
            res.json(findAllTime(critics))

        })
})

module.exports = router