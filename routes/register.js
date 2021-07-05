const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/', (req,res) =>{
  res.render('register.ejs')
})

router.post('/',(req,res) =>{
  let objUser = {
    username:req.body.username,
    password:req.body.password,
    role:req.body.role,
    secret:req.body.secret
  }
  Model.User
  .create(objUser)
  .then(data =>{
    // res.render('register.ejs')
    res.send(objUser)
  })
  .catch(err =>{
    res.send(err)
  })

})


module.exports = router
