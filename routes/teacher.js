const express = require('express')
const router = express.Router()
const Model = require('../models')

//pake req.query ? https://expressjs.com/en/api.html#req.query

router.get('/', (req, res) => {
    Model.Teacher.findAll({
        include: [{
            model: Model.Subject
        }]
    })
    .then(allTeachers => {
        let allData = []
        allTeachers.forEach(teacher => {
            allData.push(teacher)
        })
        res.render('./teachers_data.ejs', {title: 'All Teachers Data', allData: allData})
    })
    .catch(err => {
        res.send(`ERROR: ${err}`)
    })
})

router.get('/add', (req, res) => {
    res.render('./teachers_form.ejs')
})

router.post('/add', (req, res) => {
    let e = req.body
    let teacherData = {
        First_Name: e["First Name"],
        Last_Name: e["Last Name"],
        Email: e["Email"],
        SubjectId: e["SubjectId"],
        createdAt: new Date(),
        updatedAt: new Date()
    }
    Model.Teacher.create(teacherData)
    .then(teacherData => {
        res.redirect('/teacher')
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/edit/:id', (req, res) => {
    let id = req.params.id
    let data = null
    Model.Teacher.findByPk(id)
    .then((theTeacher) => {
        data = theTeacher
        return Model.Subject.findAll()
    })
    .then(findSubjectsName => {
        res.render('./edit_teacher.ejs', 
        {
            title: 'Edit Teacher Data',
            data,
            subjects: findSubjectsName
        })
    })
    .catch(err => {
        res.send(err)
    })
})

router.post('/edit/:id', (req, res) => {
    let dataUpdated = req.body
    
    Model.Teacher.update({
        id: req.params.id,
        First_Name: dataUpdated["First Name"],
        Last_Name: dataUpdated["Last Name"],
        Email: dataUpdated["Email"],
        SubjectId: dataUpdated["SubjectId"]
    }, 
    {
        where: 
        {id: req.params.id}
    })
    .then(() => {
        res.redirect('/teacher')
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/delete/:id', (req, res) => {
    // let teacher = null;
    Model.Teacher.findByPk(req.params.id)
    .then(teacherData => {
        // teacher = teacherData
        return Model.Teacher.destroy({where: {id: teacherData.id}})
    })
    .then(() => {
        res.redirect('/teacher')
    })
    .catch(err => {
        res.send(err)
    })
})

module.exports = router