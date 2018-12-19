const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/', function( req, res ) {
  res.render('register.ejs')
})

router.post('/', function( req, res ) {
  Model.User.create({
    username : req.body.username,
    password : req.body.password,
    role : req.body.role
  })
  .then( created => {
    res.send(created)
  })
  .catch( err => {
    res.send(err)
  })
})

module.exports= router

// const crypto = require('crypto');

// const secret = 'abcdefg';
// const hash = crypto.createHmac('sha256', secret)
//                    .update('I love cupcakes')
//                    .digest('hex');
// console.log(hash);