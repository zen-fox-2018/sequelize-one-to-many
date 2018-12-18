const router = require('express').Router();
const Model = require('../models');
const scoreByLetter = require('../helpers/scoreByLetter');

router.get('/', (req, res) => {
  Model.Subject.findAll({
    include: [{
      model: Model.Teacher
    }]
  })
  .then((subjects) => {
    res.render('subjects', {
      title: 'SUBJECTS',
      subjects : subjects
    })
  })

  .catch((err) => {
    res.send(err);
  })
})

router.get('/:id/enrolled-students', (req, res) => {
  let id = req.params.id;
  Model.Subject.findOne({
    include: [{
      model: Model.Student
    }],
    where: {
      id : id
    }
  })

  .then((subject) => {
    // res.send(subject)
    res.render('subjectEnroll', {
      title: `${subject.subjectName}`,
      subject : subject,
      scoreByLetter : scoreByLetter
    })
  })

  .catch((err) => {
    res.send(err);
  })

})

router.get('/:id/give-score', (req, res) => {
  let id = req.params.id;
  Model.StudentSubject.findOne({
    where: {id : id}
  })

  .then((studentSubject) => {
      return Promise.all([Model.Student.findByPk(studentSubject.StudentId),Model.Subject.findByPk(studentSubject.SubjectId)])
  })

  .then((dataScore) => {
    res.render('giveScore', {
      title: `INPUT SCORE`,
      id : id,
      subjectName: dataScore[1].subjectName,
      studentName: `${dataScore[0].firstName} ${dataScore[0].lastName}`
    })
  })

  .catch((err) => {
    res.send(err);
  })
})

router.post('/:id/give-score', (req, res) => {
  let id = req.params.id;
  let score = req.body.score;
  let updateScore = {
    score : score
  }
  Model.StudentSubject.update(updateScore, {
    where: {
      id: id
    }
  })
  .then((data) => {
    res.redirect('/subjects')
  })

  .catch((err) => {
    res.send(err);
  })
})


module.exports = router;