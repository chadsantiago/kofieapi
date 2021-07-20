const Coffee = require('../models/coffee.model')
const jwt = require('jsonwebtoken')

const get_coffee = async () => {
    try {
        const coffee = await Coffee.find().sort({"createdAt": -1})
        return coffee
    } catch(err) {
        return err.message
    }
}

const get_coffeeId = async (id) => {
    try {
        const coffee = await Coffee.findById(id)
        if (coffee == null) {
           return  {error: 'cannot find coffee'}
        }
        return coffee
    } catch(err) {
        return  {error: 'cannot find coffee'}
    }
}

const createToken = (id, usn) => {
    return jwt.sign({ id, usn }, process.env.TOKEN_SECRET)
}

module.exports = {
    get_coffee,
    get_coffeeId,
    createToken
}