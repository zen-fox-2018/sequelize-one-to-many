const express = require('express')
const router = express.Router()
const Model = require('../models')

router.post('/',(req,res)=>{
    let newUser = req.body
    let objUser = {
        username : newUser['username'],
        password : newUser['password'],
        role : newUser['role'],
        // secret : newUser['secret']
    }
    Model.User
    .create(objUser)
    .then(()=>{
        res.redirect('/register')
    })
    .catch(err=>{
        res.send(err)
    })
})

router.get('/',(req,res)=>{
    res.render('register.ejs')
})

module.exports = router