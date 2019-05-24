const router = require('express').Router()
const passport = require('passport')

// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user })
})

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    req.logout()
    res.redirect('back')
})

// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}))

// callback route for google to redirect to 
router.get(
    '/google/redirect',
    passport.authenticate('google'),
    (req, res) => {
        if (req.get('Referrer')) {
            res.redirect('back')
        } else {
            res.redirect('http://localhost:3000')
        }
        
    })

module.exports = router