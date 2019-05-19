const router = require('express').Router()

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

module.exports = router