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
            studsEnrolled: subject.Students,
            ConvertGrade: ConvertGrade
        })
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/:id/give-score', (req, res) => {
    let id = req.params.id
    let studId = null
    let subData = null;
    Model.Student_Subject.findOne({
        where: {id: id}
    })
    .then(allData => {
        studId = allData.StudentId
        return Model.Subject.findByPk(allData.SubjectId)
    })
    .then(subject => {
        subData = subject
        return Model.Student.findByPk(studId)
    })
    .then(student => {
        res.render('./input_score_form.ejs', 
        {
            title: 'Input Student Score',
            allData: student,
            subData: subData,
            stuSubId: id
        })
    })
    .catch(err => {
        res.send(err)
    })
})

router.post('/:id/give-score', (req, res) => {
    // res.send(req.params.id)
    // res.send(req.body.Score)
    Model.Student_Subject.findByPk(req.params.id)
    .then(subStudData => {
        // res.send(subStudData)
        let updateData = {
            Score: req.body.Score
        }
        return Model.Student_Subject.update(updateData, {where: {id: req.params.id}})
    })
    .then(() => {
        res.redirect('/subject')
    })
    .catch(err => {
        res.send(err)
    })
})

module.exports = router