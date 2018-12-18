const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/', (req, res) =>{
  Model.Subject
  .findAll({
    include:[{
        model:Model.Teacher
    }]
  })
  .then(data =>{
    res.render('subject.ejs', {data})
    // res.send(data)
  })
  .catch(err =>{
    console.log(err)
    res.send(err)
  })
})



module.exports = router