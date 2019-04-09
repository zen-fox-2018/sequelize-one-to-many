const Model = require('../models')
const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  Model.Teacher.findAll({
    include: [{
        model: Model.Subject 
    }]  
})

.then(function(teacher) {
  // res.send(teacher)
  // if(teacher.length)
  res.render('teacher.ejs', {teacher: teacher, route:'teacher'})
})

.catch(function(err) {
  res.send(err)
})

})

router.get('/add', function(req, res) {
  Model.Subject.findAll()
    .then(function(subject){
      res.render('addTeacher.ejs',{route: 'teacher', subject:subject})
    })
    
  })

router.post('/add', function(req, res) {
  let teacher = {
    firstName : req.body.firstname,
    lastName : req.body.lastname,
    email : req.body.email,
    // createdAt : new Date(),
    // updatedAt : new Date (),
    SubjectId : req.body.subject
  }
  Model.Teacher.create(teacher)
    .then(function(){
      res.redirect('/teacher')
    })
    .catch(function(err) {
      res.send(err)
    })
})

router.get('/delete/:id', function(req, res) {
  let id = req.params.id
  Model.Teacher.destroy(
        { where:  { id:id }})
    .then(function(row) {
      res.redirect('/teacher')
    })
    .catch(function(err) {
      res.send(err)
    })
})

router.get('/edit/:id', function(req, res) {
  Model.Teacher.findOne({
    where: {id: req.params.id}
  })
  .then(teacher => {
     Model.Subject.findAll()
      .then(function(subject){
        res.render('./editTeacher.ejs', {teacher:teacher,subject:subject, route:'teacher'})
      })
      .catch((err)=>{
        res.send(err)
      })

  })
  .catch(function(err) {
    res.send(err)
  }) 
})

router.post('/edit/:id', function(req, res) {
  let teacher = {
    id: req.params.id,
    firstName : req.body.firstname,
    lastName : req.body.lastname,
    email : req.body.email,
    SubjectId : req.body.subject
  }
  Model.Teacher.update(teacher, {where: {id : req.params.id}})
    .then(teacher => {
      res.redirect('/teacher')
  })
  .catch(function(err) {
    res.send(err)
  }) 
})

module.exports = router