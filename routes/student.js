const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/', (req, res) => {
    Model.Student.findAll({
        include: [{
            model: Model.Subject
        }]
    })
    .then(allStudents => {
        let allTheStuds = []
        allStudents.forEach( student => {
            allTheStuds.push(student)
        })
        res.render('./students_data.ejs', {title: 'Students Data', allData: allTheStuds})
    })
    .catch(err => {
        res.send(`ERROR: ${err}`)
    })
})

router.get('/add', (req, res) => {
    res.render('./students_form.ejs')
})

router.post('/add', (req, res) => {
    let e = req.body
    let studentData = {
        first_name: e["First Name"],
        last_name: e["Last Name"],
        email: e["Email"],
        createdAt: new Date(),
        updatedAt: new Date()
    }
    Model.Student.create(studentData)
    .then(studentData => {
        res.redirect('/students')
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/delete/:id', (req, res) => {
    Model.Student.findByPk(req.params.id)
    .then(studentData => {
        return Model.Student.destroy({where: {id: studentData.id}})
    })
    .then(() => {
        res.redirect('/students')
    })
    .catch(err => {
        res.send(err)
    })
})


router.get('/:id/add-subject', (req, res) => {
    let id = req.params.id
    let data = null
    Model.Student.findByPk(id)
    .then(theStudent => {
        data = theStudent
        return Model.Subject.findAll()
    })
    .then(findSubjectsName => {
        res.render('./addSubjectToStud.ejs', 
        {
            title: 'Add Subject to Student',
            data,
            subjects: findSubjectsName
        })
    })
    .catch(err => {
        res.send(err)
    })
})

router.post('/:id/add-subject', (req, res) => {
    let subjectUpd = req.body.SubjectId
    Model.Student_Subject.create({
        StudentId: req.params.id,
        SubjectId: subjectUpd
    })
    .then(() => {
        res.redirect('/students')
    })
    .catch(err => {
        res.send(err)
    })
})

module.exports = router