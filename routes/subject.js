const Model = require('../models')
const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  Model.Subject.findAll({
    include: [{
        model: Model.Teacher
    }]  
  })

  .then(function(subject) {
    // res.send(subject)
    res.render('subject.ejs', {subject: subject, route:'subject'})
  })

  .catch(function(err) {
    res.send(err)
  })

})

router.get('/add', function(req, res) {
  res.render('addSubject.ejs',{route: 'subject'})
})

router.post('/add', function(req, res) {
let teacher = {
  subjectName : req.body.subjectName,
  createdAt : new Date(),
  updatedAt : new Date ()
}
Model.Subject.create(teacher)
  .then(function(){
    res.redirect('/subject')
  })
  .catch(function(err) {
    res.send(err)
  })
})

router.get('/delete/:id', function(req, res) {
let id = req.params.id
Model.Subject.destroy(
      { where:  { id:id }})
  .then(function(row) {
    res.redirect('/subject')
  })
  .catch(function(err) {
    res.send(err)
  })
})

router.get('/edit/:id', function(req, res) {
Model.Subject.findOne({
  where: {id: req.params.id}
})
  .then(subject => {
    res.render('./editSubject.ejs', {teacher:subject, route:'subject'})
})
.catch(function(err) {
  res.send(err)
}) 
})

router.post('/edit/:id', function(req, res) {
let teacher = {
  subjectName : req.body.subjectName
}
Model.Subject.update(teacher, {where: {id : req.params.id}})
  .then(teacher => {
    res.redirect('/subject')
})
.catch(function(err) {
  res.send(err)
}) 
})

router.get('/:id/enrolled-students', function(req, res) {
  let id = req.params.id
  Model.Subject.findOne({where: {id : id}, include: [{model : Model.Student}]})
  .then(function(subject) {
    console.log(this)
    // res.send(subject)
    res.render('enrolled-student', {subject: subject})
  })
  .catch(function(err) {
    res.send(err)
  })
})

router.get('/:id/give-score', function(req, res) {
  let id = req.params.id
  res.render('score.ejs', {id : id})
})

router.post('/:id/give-score', function(req, res) {
  let id = req.params.id
  let score = {score : req.body.score}

  Model.SubjectStudent.update(score, {where : {id : id}})
    .then(function(row) {
      res.redirect('/subject')
    })
    .catch(function(err) {
      res.send(err)
    })
})


module.exports = router