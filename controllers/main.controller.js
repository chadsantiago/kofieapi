const Coffee = require('../models/coffee.model')
const {get_coffee} = require('../services/service')
const jwt = require('jsonwebtoken')

/*
@description: index page
*/
exports.home = async (req, res) => {
    const data = await get_coffee()
    res.render('home', {data})
}

/*
@description: add page
*/
exports.add = (req, res) => {
    res.render('add')
}

/*
@description: add submit
*/
exports.add_submit = async (req, res) => {
    const coffee = new Coffee({
        item: req.body.coffee,
        price: req.body.price,
        type: req.body.category
    })
    try {
        await coffee.save()
        res.redirect('/')
    } catch(err) {
        res.redirect('/')
    }
}

/*
@description: update page
*/
exports.update_get = (req, res) => {
    const data = res.coffee
    res.render('coffee', {data})
}

/*
@description: update submit
*/
exports.update_submit = async (req, res) => {
    if (req.body.coffee != null) {
        res.coffee.item = req.body.coffee
    }
    if (req.body.price != null) {
        res.coffee.price = req.body.price
    }
    if (req.body.category != null) {
        res.coffee.type = req.body.category
    }

    const link = `/coffee?id=${req.query.id}`

    try {
        const data = await res.coffee.save()
        res.render('coffee', {data})
    } catch(err) {
        res.redirect(link)
    }
}

/*
@description: profile page
*/
exports.profile = (req, res) => {
    const token = req.cookies.token
    let data
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
        data = decodedToken.usn
    })
    res.render('profile', {data})
}

/*
@description: delete
*/
exports.delete = async (req, res) => {
    try {
        await res.coffee.remove()
        res.json({message: 'Deleted Successfully'})
    } catch(err) {
        res.status(500).json({message: err.message})
    }
}

