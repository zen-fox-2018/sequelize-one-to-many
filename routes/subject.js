const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/', (req, res) =>{
  Model.Subject
  .findAll({
    include:[{
        model:Model.Teacher,
    }]
  })
  .then(data =>{
    res.render('subject.ejs', {data})
    // res.send(data)
  })
  .catch(err =>{
    console.log(err)
    res.send(err)
  })
})

router.get('/:id/enrolled-student', (req, res) => {
  // res.render('enrolled-students.ejs')
  Model.Subject
  .findOne({
    include:[{
      model:Model.Student
    }],
    where:{
      id:req.params.id
    }
  })
  .then(data =>{
    res.render('enrolled-students.ejs', {data})
    // res.send(data)
  })
  .catch(err =>{
    res.send(err)
    console.log(err);
  })
})

router.get('/:id/give-score', (req,res)=> {
  Model.Student.findOne({
    where:{id:req.params.id},
  })
  .then(data =>{
    res.render('subject-give-score.ejs', {data})
    // res.send(data)
  })
  .catch(err =>{
    console.log(err);
    res.send(err)
  })
  // res.render('subject-give-score.ejs')
})

router.post('/:id/give-score', (req, res) => {
  let objScore = {
    score:req.body.score
  }

  Model.StudentSubject
  .update(
    objScore,
    {where: {StudentId:req.params.id}}
  )
  .then(data =>{
    res.redirect('/subject/:id/give-score')
  })
  .catch(err =>{
    console.log(err);
    res.send(err)
  })
})

module.exports = router