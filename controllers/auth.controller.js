const User = require('../models/user.model')
const {createToken} = require('../services/service')

/*
@description: login page
*/
exports.login_get = (req, res) => {
    res.render('login')
}

/*
@description: login submit
*/
exports.login_post = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.login(username, password)
        if (!('err' in user)) {
            const token = createToken(user._id, user.username)
            res.cookie('token', token, { httpOnly: true, secure: true })
            res.redirect('/')
        }
        if ('err' in user) {
            const error = 'incorrect username or password'
            res.redirect('/login' + `?error=${error.replace(/\s/g, '-')}`)
        }
    } catch(err) {
        res.status(400).json(err)
    }
}

/*
@description: logout
*/
exports.logout = (req, res) => {
    res.cookie('token', '', {maxAge: 1})
    res.redirect('/login')
}