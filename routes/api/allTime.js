const express = require('express')
const router = express.Router()

const AllTime = require('../../models/AllTime')
const Critics = require('../../models/Critics')

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
const findAllTime = (fans) => {
    let allTime = []
        fans.forEach((fan) => {
            fan.players.forEach((player, index) => {
                if (allTime.some((great) => great.player === player)) {
                    let i = allTime.findIndex(i => i.player === player)
                    allTime[i].rank += index + 1
                    allTime[i].lists++
                    allTime[i].avg = (allTime[i].rank / allTime[i].lists).toFixed(2)
                } else {
                    allTime.push({
                        rank: index + 1,
                        player: player,
                        lists: 1,
                        avg: parseFloat(index + 1).toFixed(2)
                    })

                }
            })

        })
        allTime.sort((a, b) =>  a.avg- b.avg);
        return allTime
}

module.exports = router