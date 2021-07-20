const mongoose = require('mongoose')

const coffee_schema = new mongoose.Schema({
    item: {
        type: String,
        required: [true, 'Please fill out the field!'],
        lowercase: true,
        minLength: [3, 'Please use at least 3 characters'],
        maxLength: [30, 'Please use no more than 30 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please fill out the field!'],
        max: [999, 'Price must not exceed 999']
    },
    type: {
        type: String,
        required: true,
        owercase: true,
    }
}, {timestamps : true})

module.exports = mongoose.model('Coffee', coffee_schema)