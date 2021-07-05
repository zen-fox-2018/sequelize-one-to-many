const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/', (req, res) =>{
  Model.Student.
  findAll()
  .then(data =>{
    res.render('student.ejs', {data})
  })
  .catch( err =>{
    console.log(err)
    res.send(err)
  })
})

router.get('/add', (req,res) => {
  res.render('student-add.ejs')
})

router.post('/add', function(req,res){
  let objStudent = {
    first_name: req.body['first_name'], 
    last_name: req.body['last_name'],  
    email: req.body['email'],
  }

  Model.Student
  .create(objStudent)
  .then(data =>{
    console.log('add data success');
    res.redirect('/student')
  })
  .catch(err =>{
    console.log(err)
    res.send(err)
  })
})

router.get('/edit/:id', (req, res) =>{
  Model.Student
  .findOne(
    {where:
      {id: req.params.id}
    }
  )
  .then(data =>{
    res.render('student-edit.ejs', {data})
  })
  .catch(err =>{
    res.send(err)
    console.log(err);
  })
})

router.post('/edit/:id', (req, res) =>{
    let objStudent = {
        first_name: req.body['first_name'],
        last_name: req.body['last_name'],
        email: req.body['email']
    }

    Model.Student
    .update(objStudent, 
      {
        where: {id:req.params.id}
    })
    .then(data =>{
      res.redirect('/student')
      // res.send(data)
    })
    .catch(err =>{
      console.log(err)
      res.send(err)
    })
})

router.get('/delete/:id', function(req, res){
  Model.Student
  .destroy(
      {where:
          {id:req.params.id}
      }
  )
  .then(data =>{
      res.redirect('/student')
  })
  .catch(err =>{
      console.log(err)
      res.send(err)
  })
})

router.get('/:id/add-subject', (req, res) => {
  var data = null
  Model.Student
  .findOne({
    where:{id:req.params.id}
  })
  .then(dataStudent =>{
    // res.render('student-add-subject.ejs', {data:data})
    // res.send(data)

    data = dataStudent
    return Model.Subject
    .findAll()
  })
  .then(dataSubject =>{
    res.render('student-add-subject.ejs', {data:data, dataSubject:dataSubject})
    // res.send(dataSubject)
  })
  .catch(err =>{
    res.send(err)
    console.log(err);
  })
})

router.post('/:id/add-subject', (req, res) => {
  let objConjunction = {
    StudentId: req.params.id,
    SubjectId: req.body.SubjectId
  }

  Model.StudentSubject.
  create(objConjunction)
  .then(data =>{
    res.redirect('/student')
    // res.send(data)
  })
  .catch(err =>{
    res.send(err)
    console.log(err);
  })
})




module.exports = router