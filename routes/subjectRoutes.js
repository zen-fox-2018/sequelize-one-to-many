const express = require('express')
const router = express.Router()
const Model = require('../models')
const score = require('../helpers/scoreLetter')

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
  Model.Subject.findOne({
    include : [
      {
        model : Model.Student
      }
    ],
    where : { 
      id : req.params.id
    }
  })
    .then( subjectData => {
      // res.send(subjectData)
      res.render('subjectList.ejs', { data : subjectData, functionScore : score } )
      
    })
    .catch( err => {
      res.send(err)
    })
})

router.get('/:id/give-score', function ( req, res ) {
    res.render('scoreForm.ejs', { id : req.params.id } )
})

router.post('/:id/give-score', function ( req, res ) {
  // res.send(req.body)
  Model.StudentSubject.update({
    score : req.body.score
  }, { where : { id : req.params.id  } } )
    .then( updated => {
      res.redirect('/subjects')
    })
})
module.exports = router