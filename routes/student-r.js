const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/', (req, res) => {
    Model.Student.findAll()
        .then(allStudentData => {
            res.render('student.ejs', { data: allStudentData })
        })
        .catch(err => {
            res.send(err)
        })
})

router.get('/add', (req, res) => {
    res.render('addStudent.ejs')
})

router.post('/add', (req, res) => {
    let newStudent = req.body
    let objStudent = {
        firstName: newStudent['first_name'],
        lastName: newStudent['last_name'],
        email: newStudent['email']
    }
    Model.Student
        .create(objStudent)
        .then(() => {
            res.redirect('/students')
        })
        .catch(err => {
            res.send(err)
        })
})

router.get('/:id/add-subject', (req, res) => {
    let search_id = req.params.id
    let dataSiswa = null
    Model.Student
        .findOne({
            where: {
                id: search_id
            }
        })
        .then(dataStudent => {
            dataSiswa = dataStudent
            return Model.Subject.findAll()
        })
        .then(allDataSubject => {
            res.render('addSubjectToStudent.ejs', {
                subjects: allDataSubject,
                studentData: dataSiswa
            })
            // res.send(dataSiswa)
        })
        .catch(err => {
            res.send(err)
        })
})

router.post('/:id/add-subject',(req,res)=>{
    let search_id = req.params.id
    let subjectId = req.body.SubjectId
    let objConjunction = {
        StudentId : search_id,
        SubjectId : subjectId
    }
    Model.StudentSubject
    .create(objConjunction)
    .then(()=>{
        res.redirect('/students')
    })
    .catch(err=>{
        res.send(err)
    })
})

module.exports = router