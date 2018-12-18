const Model = require('../models')
const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  Model.Student.findAll()
  .then(function(student) {
    res.render('./student.ejs', {student:student, route:'student'})
  })

  .catch(function(err) {
    res.send(err)
  })

})

router.get('/:id/add-subject', function(req, res) {
  let id = req.params.id
  Model.Student.findOne({ include: [{model: Model.Subject}], where : {id : id}})
  .then(function(student) {
    Model.Subject.findAll()
      .then(function(subject){
        res.render('./StudentEditSubject', {student:student, subject:subject})
      })
      .catch(function(err) {
        res.send(err)
      })
  })
  .catch(function(err) {
    res.send(err)
  })
})

router.post('/:id/add-subject', function(req, res) {
  let StudentId = req.params.id
  let SubjectId = req.body.subject
  let inputData = {
    StudentId : StudentId,
    SubjectId : SubjectId
  }
  console.log(inputData)
  Model.SubjectStudent.create(inputData)
  .then(function(data) {
    res.redirect('/student')
  })
  .catch(function(err) {
    res.send(err)
  })
})

router.get('/add', function(req, res) {
  res.render('./addStudent.ejs')
})


router.post('/add', function(req, res) {
let student = {
  firsName : req.body.firstname,
  lastName : req.body.lastname,
  email : req.body.email
}
Model.Student.create(student)
  .then(function(){
    res.redirect('/student')
  })
  .catch(function(err) {
    res.send(err)
  })
})

router.get('/delete/:id', function(req, res) {
let id = req.params.id
Model.Student.destroy(
      { where:  { id:id }})
  .then(function(row) {
    res.redirect('/student')
  })
  .catch(function(err) {
    res.send(err)
  })
})

router.get('/edit/:id', function(req, res) {
Model.Student.findOne({
  where: {id: req.params.id}
})
  .then(student => {
    res.render('./editStudent.ejs', {student:student, route:'student'})
})
.catch(function(err) {
  res.send(err)
}) 
})

router.post('/edit/:id', function(req, res) {
let student = {
  subjectName : req.body.subjectName
}
Model.Student.update(student, {where: {id : req.params.id}})
  .then(student => {
    res.redirect('/student')
})
.catch(function(err) {
  res.send(err)
}) 
})


module.exports = router