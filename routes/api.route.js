const express = require('express')
const router = express.Router()
const api_controller = require('../controllers/api.controller')
const main_middleware = require('../middlewares/main.middleware')

/*
@path: /
@method: GET
@description: get all coffee
*/
router.get('/', main_controller.get_all)

/*
@path: /{coffee_id}
@method: GET
@description: get one coffee
*/
router.get('/:id', main_middleware.coffee_id, api_controller.get_one)

/*
@path: /coffee/random
@method: GET
@description: get one random coffee
*/
router.get('/random/one', api_controller.random)

module.exports = router