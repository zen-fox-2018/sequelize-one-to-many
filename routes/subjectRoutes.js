const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/', function ( req, res ) {
  Model.Subject.findAll({
    include: [{// Notice `include` takes an ARRAY
    model: Model.Teacher
    }]
  })
    .then( allSubject => {
      // res.send(data)
      res.render('subject.ejs', { data: allSubject } )
      // res.send(allSubject)
    })
    .catch( err=> {
      res.send(err)
    })
    // .then( allSubj => {
    //   allSubj.forEach( sub => {
    //     sub.getGuru() // getGuru didapat setelah buat "as" di model
    //     .then( guru => {
    //       console.log('=============', guru);
    //       res.send('test')
    //     })
    //   })
    // })
})

router.get('/add', function ( req, res ) {
  res.render('addSubject.ejs')
})

router.post('/add', function ( req, res ) {
  res.send(req.body)
  Model.Student.create({
    subjectName : req.body.subjectName
  })
    .then( created => {
      res.redirect('/subjects')
    })
    .catch( err => {
      res.send(err)
    })
})

router.get('/:id/enrolled-students', function ( req, res ) {
  // console.log('============', req.params.id)
  Model.StudentSubject.findAll({
    include : [
      {
        model : Model.Student
      }
    ],
    where : { 
      SubjectId : req.params.id
    }
  })
    .then( subjectData => {
      Model.Subject.findByPk(req.params.id)
        .then( subject => {
            // res.send(subjectData)
            res.render('subjectList.ejs', { data : subjectData, subjectName : subject } )
        })
        .catch( err => {
          res.send(err)
        })
    })
    .catch( err => {
      res.send(err)
    })
})

router.get('/:subjId/give-score', function ( req, res ) {
  Model.StudentSubject.findAll({
    include : [
      {
        model : Model.Student
      }
    ],
    where : {
      SubjectId : req.params.subjId
    }
  })
    .then( studsubject => {
      // res.send(studsubject)
      Model.Subject.findByPk(req.params.subjId)
        .then( subject => {
          res.render('scoreForm.ejs', { data : studsubject, name : subject.subjectName } )
        })
    })
    .catch( err => {
      res.send(err)
    })
})

// router.get('/', function( req, res ) {
//   Model.Subject.findAll({
//     include: [{// Notice `include` takes an ARRAY
//     model: Model.Student
//     }]
//   })
//     .then( allSubject => {
//       // res.send(data)
//       // res.render('subject.ejs', { data: allSubject } )
//       res.send(allSubject)
//     })
//     .catch( err=> {
//       res.send(err)
//     })
// })


module.exports = router