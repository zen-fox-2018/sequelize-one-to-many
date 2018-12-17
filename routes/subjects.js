const express = require('express');
const router = express.Router();
const Model = require('../models');

router.get('/', function (req,res) {
  let dataTeacher = null;
  let dataSubject = null
  Model.Subject.findAll()
  .then(itemSubject =>{
    dataSubject = itemSubject;
    return Model.Teacher.findAll({
      include : [{
        model: Model.Subject
      }]
    });
  })
  .then(itemTeacher => {
    dataTeacher = itemTeacher;
    res.render('subjects.ejs',{
      title: 'Subject List',
      dataSubject: dataSubject,
      dataTeacher: dataTeacher
    })
  })
  .catch(err => {
    res.render('subjects.ejs',{
      title: 'Subject List',
      dataSubject: err
    })
  })
})

router.get('/add', function(req, res) {
  res.render('addsubject.ejs')
})

router.post('/add', function(req, res) {
  //add subject ke db
  // console.log(req.body);
  Model.Subject.create(req.body)
  .then(data => {
    console.log(req.body,'saved');
    res.redirect('/subjects');
  })
  .catch(err =>{
    res.send(err);
  })
})

router.get('/edit/:id', function(req, res) {
  // res.render('editsubject.ejs')
  let value = req.params.id
  console.log(req.params.id);
  Model.Subject.findOne({
    where : {
      id : req.params.id
    }
  })
  .then(item =>{
    console.log(item);
    if(item != null){
      res.render('editsubject.ejs', {
      title : 'Edit Subject Data',
      data : item.dataValues
      })

    }
  })
  .catch(err =>{
    res.render('editsubject.ejs', {
      title : 'Subject id',
      data : 'error'
    })
  })
})

router.post('/edit/:id', function(req, res) {
  Model.Subject.update(
    req.body,
    { where : {id : req.params.id}}
  )
  .then((data) =>{
    console.log('success');
    res.redirect('/subjects')
  })
  .catch(err =>{
    console.log(err);
  })
})

router.get('/delete/:id', function(req, res) {
  Model.Subject.destroy(
    { where : {id : req.params.id}}
  )
  .then(() =>{
    res.redirect('/subjects')
  })
  .catch(err =>{
    console.log(err);
  })
})


module.exports = router;
