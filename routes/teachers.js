const express = require('express');
const router = express.Router();
const Model = require('../models');

router.get('/', function (req,res) {
  Model.Teacher.findAll({
    include : [{
      model: Model.Subject
    }]
  })
  .then(item => {
    res.render('teachers.ejs',{
      title : 'Teacher List',
      data : item
    })
    // res.send(item)
  })
  .catch(err => {
    res.render('teachers.ejs', {
      title : 'Teacher List',
      data : err
    })
  })
})

router.get('/add', function (req, res){
  //select
  Model.Subject.findAll()
  .then(itemSubject =>{
    res.render('addteacher.ejs',{
      title : 'Teacher List',
      dataSubject : itemSubject
    })
  })
  .catch(err =>{
    res.render('addteacher.ejs',{
      title : 'Teacher List',
      dataSubject : err
    })
  })
})

router.post('/add', function(req, res) {
  //add teacher ke db
  var obj = {
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email : req.body.email,
    SubjectId : req.body.SubjectId
  }
  // console.log(obj, '=====');

  Model.Teacher.create(obj)
  .then(data => {
    console.log(req.body,'saved');
    res.redirect('/teachers');
  })
  .catch(err =>{
    // console.log('============',req.body);
    console.log(err);
    res.send('err')
  })
})

router.get('/edit/:id', function(req, res) {
  // res.render('editteacher.ejs')
  let dataSubject = null;
  let value = req.params.id;
  let item = null;
  console.log(req.params.id);
  Model.Teacher.findOne({
    where : {
      id : req.params.id
    },
    include : [{
      model: Model.Subject
    }]
  })

  .then(itemFindOne =>{
    item = itemFindOne;
    return Model.Subject.findAll()
  })

  .then(itemSubject =>{
    dataSubject = itemSubject;
    // console.log('asfafad',item);
    // console.log('====',dataSubject);
    if(item != null){
      res.render('editteacher.ejs', {
      title : 'Edit Teacher data',
      data : item,
      dataSubject : dataSubject
      })
    }
  })

  .catch(err =>{
    res.render('editteacher.ejs', {
      title : 'Teacher id',
      data : 'error'
    })
  })

  //buat select
})

router.post('/edit/:id', function(req, res) {
  var obj = {
    id : req.params.id,
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email : req.body.email,
    SubjectId : req.body.SubjectId
  }
  Model.Teacher.update(
    obj,
    { where : {id : req.params.id}}
  )
  .then((data) =>{
    console.log(req.body);
    console.log('success');
    res.redirect('/teachers')
  })
  .catch(err =>{
    console.log(err);
  })
})

router.get('/delete/:id', function(req, res) {
  Model.Teacher.destroy(
    { where : {id : req.params.id}}
  )
  .then(() =>{
    res.redirect('/teachers')
  })
  .catch(err =>{
    console.log(err);
  })
})

module.exports = router;
