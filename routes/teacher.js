const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', (req, res) => {
  
  db.Teacher.findAll({
    include: [{
      model: db.Subject
    }]
  })

  .then((result) => {
    // console.log(result);
    // res.send(result[0].Subject.subjectName)
    // res.send(result[0])
    res.render('teacher', { dataTeacher: result });
  })
  .catch((err) => {
    res.send(err);
  });

});

router.get('/edit/:id', (req, res) => {

  let tmp = [];

  db.Teacher.findOne({
    where: {
      id: req.params.id
    }
  })

    .then((result) => {
      tmp = result
      // console.log(result);
      return db.Subject.findAll()
    })
    .then(subjectName => {
      // console.log(subjectName);
      // res.send(tmp)
      res.render('teacherEdit', { editSubject: subjectName, editTeacher: tmp })
    })
    .catch((err) => {
      res.send(err);
    });

});

router.post('/edit/:id', (req, res) => {

  db.Teacher.update({
    id : req.params.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    SubjectId: req.body.SubjectId
  }, {
      where: {
        id: req.params.id
      }
    })

    .then(() => {
      res.redirect('/teachers');
    }).catch((err) => {
      res.send(err);
    });

});

module.exports = router;