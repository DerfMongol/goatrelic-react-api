const router = require('express').Router()
const User = require('../../models/User')

router.get('/', (req,res) => {
    User.find()
       .then(user => res.json(user))
})


module.exports = router