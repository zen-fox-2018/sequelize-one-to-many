const router = require('express').Router();
const Model = require('../models');

router.get('/', (req, res) => {
  Model.Student.findAll()
  .then((students) => {
    res.render('students.ejs', {
      head: 'KMSCHOOL',
      title : 'STUDENTS DATA',
      data: students
    })
  })

  .catch((err) => {
    res.send(err);
  })
})

router.get('/add', (req, res) => {
  res.render('addStudent.ejs', {
    head: 'KMSCHOOL',
    title : 'FORM STUDENT',
    message : 'Insert Data Student'});
});

router.get('/:id/add-subject', (req, res) => {
  let dataStudent = null;
  Model.Student.findByPk(req.params.id)
    .then((student) => {
      dataStudent = student;
      return Model.Subject.findAll()
    })


    .then((subjects) => {
      res.render('addStudentSubject.ejs', {
        head: 'KMSCHOOL',
        title : 'FORM STUDENT',
        message : 'Add Subject to Student',
        student : dataStudent,
        subjects : subjects
      });
    })

    .catch((err) => {
      res.send(err);
    });
});

router.post('/add', (req, res) => {
  let newStudent = {
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    email : req.body.email
  };
  console.log(newStudent);

  Model.Student.create(newStudent)
    .then((data) => {
      res.redirect('/students');
    })

    .catch((err) => {
      res.redirect(`/students/add?msg=${err.errors[0].message}`);
    })
})

router.post('/:id/add-subject', (req, res) => {
  let id = req.params.id;
  let SubjectId = req.body.SubjectId;
  let newStudentSubject = {
    StudentId : id,
    SubjectId : SubjectId
  }
  Model.StudentSubject.create(newStudentSubject)
    .then((data) => {
      res.send(data)
    })

    .catch((err) => {
      res.send(err);
    })
})

router.get('/subject', (req, res) =>{
  Model.Student.findAll({
    include: {
      model: Model.Subject
    }
  })
    .then((students) => {
      res.send(students);
    })

    .catch((err) => {
      res.send(err);
    })
})

module.exports = router;