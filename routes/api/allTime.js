const express = require('express')
const router = express.Router()

const AllTime = require('../../models/AllTime')

router.get('/nba', (req, res) => {
    AllTime.Nba.find()
        .sort(({ avg: 1 }))
        .collation({locale: "en_US", numericOrdering: true})
        .then(player => res.json(player))

})

router.get('/nhl', (req, res) => {
    AllTime.Nhl.find()
        .sort({ avg: 1 })
        .collation({locale: "en_US", numericOrdering: true})
        .then(player => res.json(player))

})

router.get('/pga', (req, res) => {
    AllTime.Pga.find()
        .sort({ avg: 1 })
        .collation({locale: "en_US", numericOrdering: true})
        .then(player => res.json(player))

})

module.exports = router