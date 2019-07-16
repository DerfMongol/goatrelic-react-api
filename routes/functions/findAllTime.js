
module.exports = (goatJudges) => {
        let allTime = []
            goatJudges.forEach((goatJudge) => {
                goatJudge.players.forEach((player, index) => {
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
            allTime.sort((a, b) =>  b.lists - a.lists || a.avg - b.avg  );
            return allTime
    }
