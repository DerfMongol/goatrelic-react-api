const passport = require('passport')

module.exports = app => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile']
    }))

    app.get(
        '/auth/google/redirect',
        passport.authenticate('google'),
        (req, res) => {
            console.log(`redirect: ${req.user}`)

            if (req.get('Referrer')) {
                res.redirect('back')
            } else {
                res.redirect('http://goatrelic.herokuapp.com')
            }
        })

    app.get(
        '/api/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            console.log(`redirect: ${req.user}`)

            if (req.get('Referrer')) {
                res.redirect('back')
            } else {
                res.redirect('http://goatrelic.herokuapp.com')
            }
        
        }
    )

    app.get('/auth/login', (req, res) => {
        res.render('login', { user: req.user })
    })

    app.get('/auth/logout', (req, res) => {
        req.logout()
        res.redirect('back')
    })

    app.get('/current_user', (req, res) => {
        res.send(req.user);
    })
};