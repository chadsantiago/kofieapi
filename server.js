// env file
require('dotenv').config()

// express
const express = require('express')
const app = express()

// mongoose
const mongoose = require('mongoose')

// cookie-parser
const cookie = require('cookie-parser')

// connect to database
mongoose.connect(process.env.DATABASE_URL,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => console.log('Connected to database'))
    .catch((err) => console.log(err))

// force https
if(process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
        res.redirect(`https://${req.header('host')}${req.url}`);
    else
        next()
    })
}

// middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}));
app.use(cookie())

// register view engine
app.set('view engine', 'ejs')

// auth router
const auth_router = require('./routes/auth.route')
app.use('/', auth_router)

// main route
const main_router = require('./routes/main.route')
app.use('/', main_router)

// API route
const api_router = require('./routes/api.route')
app.use('/api/menu', api_router)

// 404 error
app.get('*', (req, res) => {
    res.render('error')
})

// port
const port = 3000
app.listen(process.env.PORT || port, () => console.log(`Server is listening to port ${port}`))