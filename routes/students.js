const express = require('express');
const router = express.Router();
const Model = require('../models');

 //--------------------------list student ---------------------
router.get('/', function (req,res) {
  Model.Student.findAll({
    include : [{
      model: Model.Subject
    }]
  })
  .then(itemStudent => {
    res.render('students.ejs',{
      title : 'Student List',
      dataStudent : itemStudent
    })
    // res.send(itemStudent)
  })
  .catch(err => {
    res.send(err);
  })
})

 //-----------------------add student--------------------------
router.get('/add', function (req, res){
  //select
  Model.Subject.findAll()
  .then(itemSubject =>{
    res.render('addstudent.ejs',{
      title : 'Student List',
      dataSubject : itemSubject
    })
  })
  .catch(err =>{
    res.send(err);
  })
})

router.post('/add', function(req, res) {
  var obj = {
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email : req.body.email,
  }

  Model.Student.create(obj)
  .then(data => {
    // console.log(req.body,'saved');
    res.redirect('/students');
  })
  .catch(err =>{
    console.log(err);
    res.send(err)
  })
})

//----------------------edit student----------------------------
router.get('/edit/:id', function(req, res) {
  Model.Student.findOne({
    where : {
      id : req.params.id
    },
    include : [{
      model: Model.Subject
    }]
  })
  .then(itemFindOne =>{
    res.render('editstudent.ejs',{
      title : 'Edit Student',
      data : itemFindOne
    })
  })
  .catch(err =>{
    res.send(err);
  })
})

router.post('/edit/:id', function(req, res) {
  var obj = {
    id : req.params.id,
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email : req.body.email,
  }
  Model.Student.update(
    obj,
    { where : {id : req.params.id}}
  )
  .then((data) =>{
    res.redirect('/students');
  })
  .catch(err =>{
    res.send(err);
  })
})

//---------------------------delete student-----------------
router.get('/delete/:id', function(req, res) {
  Model.Student.destroy(
    { where : {id : req.params.id}}
  )
  .then(() =>{
    res.redirect('/students');
  })
  .catch(err =>{
    res.send(err);
  })
})

//----------------add subject to student----------------------
router.get('/:id/add-subject', function(req, res) {
  let dataSubject = null;
  let value = req.params.id;
  let item = null;
  Model.Student.findOne({
    where : {
      id : req.params.id
    }
  })

  .then(itemFindOne =>{
    item = itemFindOne;
    return Model.Subject.findAll()
  })

  .then(dataSubject  =>{
    res.render('addSubjectToStudent.ejs',{
      title : 'Add Subject To Student',
      item : item,
      dataSubject : dataSubject
    })
  })
  .catch(err =>{
    // res.send(err);
    console.log(err);
  })
})

router.post('/:id/add-subject', function(req, res) {
  let obj = {
    StudentId : req.params.id,
    SubjectId : req.body.SubjectId
  }
  Model.StudentSubject.create(obj)
  .then(data =>{
    res.redirect('/students');
  })
  .catch(err =>{
    res.send(err);
  })
})

module.exports = router;
