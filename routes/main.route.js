const express = require('express')
const router = express.Router()
const main_controller = require('../controllers/main.controller')
const auth_middleware = require('../middlewares/auth.middleware')
const main_middleware = require('../middlewares/main.middleware')

/*
@path: /
@method: GET
@description: index route
*/
router.get('/', auth_middleware.requireAuth, main_controller.home)

/*
@path: /add
@method: GET
@description: add coffee route
*/
router.get('/add', auth_middleware.requireAuth, main_controller.add)

/*
@path: /add
@method: POST
@description: add coffee submit route
*/
router.post('/add', auth_middleware.requireAuth, main_middleware.validator, main_controller.add_submit)

/*
@path: /coffee
@method: GET
@description: update coffee route
*/
router.get('/coffee', auth_middleware.requireAuth, main_middleware.coffee_id, main_controller.update_get)

/*
@path: /coffee
@method: POST
@description: update coffee submit route
*/
router.post('/coffee', auth_middleware.requireAuth, main_middleware.update_validator, main_middleware.coffee_id, main_controller.update_submit)

/*
@path: /delete
@method: DELETE
@description: delete coffee
*/
router.delete('/delete', auth_middleware.requireAuth, main_middleware.coffee_id, main_controller.delete)

/*
@path: /profile
@method: GET
@description: profile route
*/
router.get('/profile', auth_middleware.requireAuth, main_controller.profile)

module.exports = router