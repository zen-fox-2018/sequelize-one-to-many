const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/', function( req, res ) {
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

router.get('/add', function ( req, res ) { // ADD SUBJECT ON PROGRESS
  res.render()
})

router.post('/add', function ( req, res ) {
  
})

router.get('/:id/enrolled-students', function ( req, res) {
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