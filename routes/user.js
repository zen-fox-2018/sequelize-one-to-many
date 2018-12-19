const router = require('express').Router()
const Model = require('../models')

router.get('/', (req, res)=> {
    res.render('register')
})

router.post('/', (req, res)=> {
    let info = `success create new user`
    let objUser = {
        username: req.body.username,
        password: req.body.password, 
        role : req.body.role
    }

    Model.User.create(objUser)
    .then(()=> res.redirect(`/?info=${info}`))
    .catch(err=> res.redirect(`/?err=${err}`))
    
})

module.exports = router