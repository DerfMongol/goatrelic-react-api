const router = require('express').Router()
const User = require('../../models/User')
const Fans = require('../../models/Fans')

const authCheck = (req, res, next) => {
    if(!req.user){
        // if user is not logged in
        res.send(null)
    } else {
        // if logged in 
        next()
    }
}

router.get('/', authCheck, (req,res) => {
    res.send(req.user)
})

router.post('/', (req, res) => {
    // console.log(req.user.googleId)
    User.findOne({ googleId: req.user.googleId }).then((currentUser) => {
        
        currentUser.nba = req.body.nba

        if (req.body.nba.length > 0) {
            Fans.Nba.findOne({googleId: req.user.googleId}).then((fanUser) => {
                if (fanUser) {
                    fanUser.players = req.body.nba
                    fanUser.save()
                } else {
                    const newFan = new Fans.Nba({
                        name: currentUser.username,
                        googleId: req.user.googleId,
                        pic: currentUser.thumbnail,
                        date: new Date().toLocaleDateString(),
                        players: req.body.nba
                    })
                    newFan.save()
                }
                
            })
            
        }
        
        currentUser.nhl = req.body.nhl
        
        if (req.body.nhl.length > 0) {
            
            Fans.Nhl.findOne({googleId: req.user.googleId}).then((fanUser) => {
                if (fanUser) {
                    fanUser.players = req.body.nhl
                    fanUser.save()
                } else {
                    const newFan = new Fans.Nhl({
                        name: currentUser.username,
                        googleId: req.user.googleId,
                        pic: currentUser.thumbnail,
                        date: new Date().toLocaleDateString(),
                        players: req.body.nhl
                    })
                    newFan.save()
                }
                
            })
            
        }

        currentUser.pga = req.body.pga
        
        if (req.body.pga.length > 0) {
            
            Fans.Pga.findOne({googleId: req.user.googleId}).then((fanUser) => {
                if (fanUser) {
                    fanUser.players = req.body.pga
                    fanUser.save()
                } else {
                    const newFan = new Fans.Pga({
                        name: currentUser.username,
                        googleId: req.user.googleId,
                        pic: currentUser.thumbnail,
                        date: new Date().toLocaleDateString(),
                        players: req.body.pga
                    })
                    newFan.save()
                }
                
            })
            
        }
        
        currentUser.save().then(currentUser => res.json(currentUser))
    })
})



module.exports = router