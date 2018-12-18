const express = require('express')
const router = express.Router()
const Model = require('../models')
const ConvertGrade = require('../helpers/convertStudGrade.js')

router.get('/', (req, res) => {
    Model.Subject.findAll({
        include: [{
            model: Model.Teacher
        }]
    })
    .then(allSubjects => {
        let allData = []
        allSubjects.forEach(subject => {
            allData.push(subject)
        })
        res.render('./subjects_data.ejs', {title: 'All Subjects Data', allData: allData})
    })
    .catch(err => {
        res.send(`ERROR: ${err}`)
    })
})

router.get('/add', (req, res) => {
    res.render('./subjects_form.ejs')
})

router.post('/add', (req, res) => {
    let e = req.body
    let subjectData = {
        Subject_Name: e["Subject Name"],
    }
    Model.Subject.create(subjectData)
    .then(() => {
        res.redirect('/subject')
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/delete/:id', (req, res) => {
    Model.Subject.findByPk(req.params.id)
    .then(subjData => {
        return Model.Subject.destroy({where: {id: subjData.id}})
    })
    .then(() => {
        res.redirect('/subject')
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/:id/enrolled-students', (req, res) => {
    let id = req.params.id
    Model.Subject.findOne({
        include: [{model: Model.Student}],
        where: {id: id}
    })
    .then(subject => {
        // res.send(subject)
        res.render('./enrolled_students.ejs', 
        {
            title: subject.Subject_Name,
            studsEnrolled: subject.Students, //List student yang enroll certain subject
            ConvertGrade: ConvertGrade, //helper
            subData: subject
        })
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/:id/give-score/:studId', (req, res) => {
    let studId = req.params.studId
    let subId = req.params.id
    Model.Student.findByPk(studId)
    .then(student => {
        res.render('./input_score_form.ejs', 
        {
            title: 'Input Student Score',
            allData: student,
            subId: subId
        })
    })
    .catch(err => {
        res.send(err)
    })
})

router.post('/:id/give-score/:studId', (req, res) => {
   let updateData = {
        Score: req.body.Score
    }
    Model.Student_Subject.update(updateData, {where: {SubjectId: req.params.id, StudentId: req.params.studId}})
    .then(() => {
        res.redirect(`/subject/${req.params.id.trim()}/enrolled-students`)
    })
    .catch(err => {
        res.send(err)
    })
})

module.exports = router