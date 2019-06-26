const express = require('express')
const router = express.Router()

const FansAllTime = require('../../models/FansAllTime')
const Fans = require('../../models/Fans')

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