const express = require('express')
const router = express.Router()
const Model = require('../models')


router.get('/', (req, res) =>{
  Model.Teacher.
  findAll({
      include:[{
          model:Model.Subject
      }]
  })
  .then(data =>{
    res.render('teacher.ejs', {data})
    // res.send(data)
  })
  .catch(err =>{
    console.log(err);
    res.send(err)
  })
})

router.get('/add', (req, res) => {
  res.render('teacher-add.ejs')
})

router.post('/add', function(req,res){
  let objTeacher = {
    first_name: req.body['first_name'], 
    last_name: req.body['last_name'],  
    email: req.body['email'],
    SubjectId: req.body['SubjectId']
  }

  Model.Teacher
  .create(objTeacher)
  .then(data =>{
    console.log('add data success');
    res.redirect('/teacher')
  })
  .catch(err =>{
    console.log(err)
    res.send(err)
  })
})

router.get('/edit=:id', function(req, res){
    var data = null
  Model.Teacher.findOne(
      {where:
          {id:req.params.id}
      }
  )
  .then(dataTeacher => {

    data = dataTeacher
    // res.render('teacher-edit.ejs', {data})
   return Model.Subject.findAll()
  })
  .then(dataSubject =>{
      res.render('teacher-edit.ejs', {data: data, dataSubject : dataSubject})
    // console.log(dataSubject)
  })
  .catch(err =>{
      console.log(err)
      res.send(err)
  })
})

router.post('/edit=:id', function(req,res){
  let objTeacher = {
    //   first_name: req.body['first_name'],
    //   last_name: req.body['last_name'],
    //   email: req.body['email'],
      SubjectId: req.body['SubjectId']
  }

//   var data = null
  Model.Teacher.update(objTeacher, 
      {
          where:{id:req.params.id}
      }
  )
  .then (data =>{
      res.redirect('/teacher')
  })
  .catch(err =>{
      console.log(err);
      res.send(err)
  })
})

router.get('/delete=:id', function(req, res){
  Model.Teacher.destroy(
      {where:
          {id:req.params.id}
      }
  )
  .then(data =>{
      res.redirect('/teacher')
  })
  .catch(err =>{
      console.log(err)
      res.send(err)
  })
})



module.exports = router