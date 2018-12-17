const express = require('express');
const router = express.Router();
const Model = require('../models');

router.get('/', function (req,res) {
  Model.Student.findAll({
    include : [{
      model: Model.Subject
    }]
  })
  .then(itemStudent => {
    console.log('akdfgiqjepoeq',itemStudent);
    res.render('students.ejs',{
      title : 'Student List',
      dataStudent : itemStudent
    })
    // res.send(item)
  })
  .catch(err => {
    res.render('students.ejs', {
      title : 'Teacher List',
      data : err
    })
  })
})

router.get('/add', function (req, res){
  //select
  Model.Subject.findAll()
  .then(itemSubject =>{
    res.render('addteacher.ejs',{
      title : 'Teacher List',
      dataSubject : itemSubject
    })
  })
  .catch(err =>{
    res.render('addteacher.ejs',{
      title : 'Teacher List',
      dataSubject : err
    })
  })
})



module.exports = router;
