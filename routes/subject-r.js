const express = require('express')
const router = express.Router()
const Model = require('../models')
const convertGrade = require('../helpers/convertGrade')

router.get('/', (req,res)=>{
    Model.Subject
    .findAll({
        include : [
            {
                model : Model.Teacher
            }
        ]
    })
    .then(allSubjectData=>{
        // res.send(allSubjectData)
        res.render('subject.ejs',{data : allSubjectData})
    })
    .catch(err=>{
        res.send(err)
    })
})

router.get('/:id/enrolled-students',(req,res)=>{
    let search_id = req.params.id
    Model.Subject.findOne({
        include : [
            {
                model : Model.Student
            }
        ],
        where : {
            id : search_id
        }
    })
    .then(allSubjectData=>{
        // res.send(allSubjectData)
        res.render('addScoreToStudent.ejs',{
            subject:allSubjectData,
            convertGrade
        })
    })
    .catch(err=>{
        res.send(err)
    })
})

router.get('/:id/give-score',(req,res)=>{
    let search_id = req.params.id
    let dataKonjungsi = null
    let dataSiswa = null
    Model.StudentSubject
    .findOne({        
        where : {
            id : search_id
        }
    })
    .then(dataStudentSubject=>{        
        dataKonjungsi = dataStudentSubject
        return Model.Student.findByPk(dataStudentSubject.StudentId)
    })
    .then(dataStudent=>{
        // res.send(dataStudent)
        dataSiswa = dataStudent
        return Model.Subject.findByPk(dataKonjungsi.SubjectId)
    })
    .then(dataSubject=>{
        // res.send(dataSubject)
        res.render('scoreForm.ejs', {
            subject : dataSubject,
            student : dataSiswa,
            konjungsi : dataKonjungsi
        })
    })
    .catch(err=>{
        res.send(err)
    })
})

router.post('/:id/give-score',(req,res)=>{
    let search_id = req.params.id
    let score = req.body.score
    Model.StudentSubject
    .update({
        id :search_id,
        score : score
    },{
        where: {
            id : search_id
        }
    })
    .then(()=>{
        res.redirect('/subjects')
    })
    .catch(err=>{
        res.send(err)
    })
})

module.exports = router