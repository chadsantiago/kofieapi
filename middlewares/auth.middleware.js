const jwt = require('jsonwebtoken')

exports.requireAuth = (req, res, next) => {
    const token = req.cookies.token

    // validate auth token
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
            if (err) {
                res.redirect('/login')
            }
            else {
                next()
            }
        })
    }
    else {
        res.redirect('/login')
    }
}

exports.checkCookie = (req, res, next) => {
    const token = req.cookies.token

    // validate auth token
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
            if (err) {
                next()
            }
            else {
                res.redirect('/')
            }
        })
    }
    else {
        next()
    }
}