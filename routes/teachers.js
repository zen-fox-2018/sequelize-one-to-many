const router = require('express').Router();
const Model = require('../models');

router.get('/', (req, res) => {
  Model.Teacher
    .findAll( {
      include : [{
        model : Model.Subject
      }]
    })
    .then((teachers) => {
      // console.log(teachers);
      // res.send(teachers);
      res.render('teachers', {
        title : 'TEACHERS',
        teachers : teachers,
      })
    })

    .catch((err) => {
      console.log(err);
      res.send(err);
    })

})

router.get('/add', (req, res) => {
  Model.Subject
    .findAll()
    .then((subjects) => {
      let teacher = "null";
      res.render('addTeacher', {
        title: 'FORM TEACHER',
        message: 'Insert data teacher',
        subjects : subjects,
        teacher: "null",
        msg : req.query.msg
      })
    })

    .catch((err) => {
      res.send(err);
    })

})

router.get('/edit/:id', (req, res) => {
  let id = req.params.id;
  let dataTeacher = {};
  Model.Teacher
    .findByPk(id)
    .then((teacher) => {
      dataTeacher = teacher;
      return Model.Subject.findAll()
    })

    .then((subjects) => {
      if (req.query.id) {
        let newQuery = {
          id:req.query.id,
          firstName: req.query.firstName,
          lastName: req.query.lastName,
          email: req.query.email,
          SubjectId: req.query.SubjectId,
          msg : req.query.msg,
          action : req.quey.action
        }
        dataTeacher = newQuery;
      }
      res.render('addTeacher', {
        title: 'FORM TEACHER',
        message: 'Insert data teacher',
        subjects : subjects,
        teacher : dataTeacher
      })
    })

    .catch((err) => {
      res.send(err);
    })
})

router.post('/add', (req, res) => {
  let newTeacher = {
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    email : req.body.email,
    SubjectId : req.body.SubjectId
  };

  Model.Teacher.create(newTeacher)
    .then((data) => {
      res.redirect('/teachers');
    })

    .catch((err) => {
      res.redirect(`/teachers/add?msg=${err.errors[0].message}`);
    })
})

router.post('/edit/:id', (req, res) => {
  let id = req.params.id;
  let updateTeacher = {
    id: id,
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    email : req.body.email,
    SubjectId : req.body.SubjectId
  };

  Model.Teacher.update(updateTeacher, {
    where : {
      id : id
    }
  })
    .then((data) => {
      res.redirect(`/teachers`)
    })

    .catch((err) => {
      res.redirect(`/teachers/edit/${updateTeacher.id}?id=${updateTeacher.id}&firstName=${updateTeacher.firstName}&lastName=${updateTeacher.lastName}&email=${updateTeacher.email}&SubjectId=${updateTeacher.SubjectId}&msg=${err.errors[0].message}&action='edit'`)
      // res.send(err.errors[0].message)
    })
})

router.get('/delete/:id', (req, res) => {
  let id = req.params.id;
  Model.Teacher.destroy({where: {id : id}})
})

module.exports = router;