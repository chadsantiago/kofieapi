const mongoose = require('mongoose')
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please fill out the field!'],
        unique: true,
        minLength: [3, 'Username must contain 3 characters'],
        lowercase: true
    },
    email: {
        type: String,
        required: [true, 'Please fill out the field!'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please fill out the field!'],
        minLength: [8, 'Password must contain 8 characters']
    }
}, {timestamps : true})

// login static method
// will be called after user logs in
// it will check if the username or password is correct
userSchema.statics.login = async function(username, password) {
    const error = {err: 'incorrect username or password'}
    try {
        const user = await this.findOne({ username })
        if (user) {
            const auth = await bcrypt.compare(password, user.password)
            if (auth) {
                return user
            }
            return error
        }
        return error
    }
    catch (err) {
        return err
    }
}

module.exports = mongoose.model('user', userSchema)