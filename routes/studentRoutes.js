const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/', function( req, res ) {
  // res.send('STUDENT IS HERE')
  Model.Student.findAll()
    .then( allStudent => {
      res.render('student.ejs', { data : allStudent} )
    })
})

router.post('/', function( req, res ) {
  if (req.body.delete) {
    Model.Student.destroy( {where : { id : req.body.delete} } )
      .then( deleted => {
        res.redirect('/students')
      })
      .catch( err => {
        res.send(err)
      })
  }
})

router.get('/add', function ( req, res ) {
  Model.Subject.findAll()
    .then( subjectData => {
      res.render('addStudent.ejs', { subjData : subjectData } )
    })
})

router.post('/add', function ( req, res ) {
  // res.send(req.body)
  Model.Student.create({
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      email : req.body.email
    })
    .then( created => {
      res.redirect('/students/')
    })
    .catch( err => {
      res.send(err)
    })
})

router.get('/edit/:id', function ( req, res ) {
  Model.Student.findByPk(req.params.id)
    .then( student => {
      res.render('editStudent.ejs', { data : student } )
    })
    .catch( err => {
      res.send(err)
    })
})

router.post('/edit/:id', function ( req, res ) {
  Model.Student.update({
    id : req.params.id,
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    email : req.body.email,
    updatedAt : new Date()
  }, { where : { id : req.params.id } } )
    .then( updated => {
      res.redirect('/students')
    })
    .catch( err => {
      res.send(err)
    })
})

router.get('/:id/add-subject', function ( req, res ) {
  Model.Student.findByPk(req.params.id)
    .then( student => {
      Model.Subject.findAll()
        .then( subject => {
          res.render('addStudentSubject.ejs', { data : student, subjData : subject } )
        })
        .catch( err => {
          res.send(err)
        })
    })
    .catch( err => {
      res.send(err)
    })
})

router.post('/:StudentId/add-subject', function ( req, res ) {
  // console.log('========',req.body.SubjectId);
  // console.log('%%%%%%%%%%%%', req.params.StudentId);
  Model.StudentSubject.create({
    StudentId : req.params.StudentId,
    SubjectId : req.body.SubjectId
  })
    .then( created => {
      res.send(created)
    })
    .catch( err => {
      res.send(err)
    })
})

module.exports = router