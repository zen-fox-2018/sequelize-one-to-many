const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/', function(req, res) {
  Model.Teacher.findAll({
    include: [{
      model: Model.Subject
    }]
  })
    .then( allTeacher => {
          res.render('teacher.ejs' , { data : allTeacher })
        // res.send(allTeacher)
    })
    .catch(err => {
      console.log(err);
    })
})

router.post('/', function ( req, res ) {
  // console.log(req.body)
  Model.Teacher.destroy( { where : { id : req.body.delete}})
    .then( deleted => {
      res.redirect('/teachers')
    })
    .catch( err=> {
      res.send(err)
    })
})

router.get('/add', function ( req, res ) {
  Model.Subject.findAll()
    .then( allSubject => {
      res.render('addTeacher.ejs', { data: allSubject } )
    })
    .catch( err => {
      res.send(err)
    })
})

router.post('/add', function ( req, res ) {
  Model.Subject.findOne( { where : { subjectName : req.body.subjectName } })
    .then( subjectData => {
      let subId = subjectData.id
      Model.Teacher.create({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        SubjectId : subId
      })
      .then( created => {
        res.redirect('/teachers')
      })
      .catch( err => {
        res.send(err)
      })
    })
    .catch( err => {
      res.send(err)
    })
})

router.get('/edit/:id', function ( req, res ) {
  Model.Teacher.findByPk(req.params.id)
    .then( teacherData => {
      Model.Subject.findAll()
      .then( allSubject => {
        res.render('editTeacher.ejs', { data : teacherData, subjData : allSubject })
      })
    })
    .catch( err => {
      res.send(err)
    })
})

router.post('/edit/:id', function ( req, res ) {
  let teacher = {
    id : req.params.id,
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    email : req.body.email,
    SubjectId : req.body.SubjectId,
    updatedAt : new Date()
  }
  // console.log(req.body);

  Model.Teacher.update( teacher, { where : { id : req.params.id} } )
    .then(updated => {
      res.redirect('/teachers')
    })
    .catch( err => {
      res.send(err)
    })
})

module.exports = router