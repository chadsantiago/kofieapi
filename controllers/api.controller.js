const Coffee = require('../models/coffee.model')
const {get_coffee} = require('../services/service')

// get all
exports.get_all = async (req, res) => {
    try {
        const data = await get_coffee()
        res.json(data)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
}

// get one
exports.get_one = (req, res) => {
    res.json(res.coffee)
}

// get one random
exports.random = async (req, res) => {
    try {
        const coffee = await Coffee.find()
        const rand = Math.floor(Math.random() * coffee.length)
        res.json(coffee[rand])
    } catch(err) {
        res.status(500).json({message: err.message})
    }
}