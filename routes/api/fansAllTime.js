const express = require('express')
const router = express.Router()

const FansAllTime = require('../../models/FansAllTime')

router.get('/nba', (req, res) => {
    FansAllTime.Nba.find()
        .sort(({ avg: 1 }))
        .collation({locale: "en_US", numericOrdering: true})
        .then(player => res.json(player))

})

router.get('/nhl', (req, res) => {
    FansAllTime.Nhl.find()
        .sort({ avg: 1 })
        .collation({locale: "en_US", numericOrdering: true})
        .then(player => res.json(player))

})

router.get('/pga', (req, res) => {
    FansAllTime.Pga.find()
        .sort({ avg: 1 })
        .collation({locale: "en_US", numericOrdering: true})
        .then(player => res.json(player))

})

module.exports = router