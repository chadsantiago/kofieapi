const Coffee = require('../models/coffee.model')

// find coffee by Id
exports.coffee_id = async (req, res, next) => {
    let coffee
    try {
        coffee = await Coffee.findById(req.query.id)
        if (coffee == null) {
            // redirect to 404 page
            return res.send('Cannot find coffee on the menu')
        }
    } catch(err) {
        // redirect to 404 page
        return res.send('Cannot find coffee on the menu')
    }
    res.coffee = coffee
    next()
}

exports.validator = (req, res, next) => {
    let errors = { item: '', price: '', type: '' }
    const price = req.body.price
    const type = req.body.category

    const pattern = /([a-zA-Z])|([$&+,:;=?@#|'<>.^*()%!-])|(\s)/g
    
    if (pattern.test(price)) {
        errors.price = 'Please match the requested format'
        return  res.redirect('/add' + `?price_error=${errors.price.replace(/\s/g, '-')}`)
    }
    if (type != 'hot' && type != 'cold') {
        errors.type = 'Please match the requested format'
        return  res.redirect('/add' + `?type_error=${errors.type.replace(/\s/g, '-')}`)
    }
    next()
}

exports.update_validator = (req, res, next) => {
    let errors = { item: '', price: '', type: '' }
    const price = req.body.price
    const type = req.body.category

    const pattern = /([a-zA-Z])|([$&+,:;=?@#|'<>.^*()%!-])|(\s)/g
    
    if (pattern.test(price)) {
        errors.price = 'Please match the requested format'
        return  res.redirect('/coffee' + `?id=${req.query.id}&price_error=${errors.price.replace(/\s/g, '-')}`)
    }
    if (type != 'hot' && type != 'cold') {
        errors.type = 'Please match the requested format'
        return  res.redirect('/coffee' + `?id=${req.query.id}&type_error=${errors.type.replace(/\s/g, '-')}`)
    }
    next()
}