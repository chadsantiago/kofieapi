const express = require('express')
const router = express.Router()
const auth_controller = require('../controllers/auth.controller')
const auth_middleware = require('../middlewares/auth.middleware')

/*
@path: /login
@method: GET
@description: login route
*/
router.get('/login', auth_middleware.checkCookie , auth_controller.login_get)

/*
@path: /login
@method: POST
@description: login sumbit route
*/
router.post('/login', auth_controller.login_post)

/*
@path: /logout
@method: GET
@description: logout route
*/
router.get('/logout', auth_middleware.requireAuth, auth_controller.logout)

module.exports = router