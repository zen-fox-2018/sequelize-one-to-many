const router = require('express').Router()
const Model = require('../models')

router.get('/', (req, res)=> {
    let info = req.query.info
    let err = req.query.err

    Model.Student.findAll() 
    .then(dataStudent=> {
        // res.send(dataStudent)
        res.render('student', {dataSend: dataStudent, info: info, err: err})
    })
    .catch(err => res.send(err))
})


router.get('/add', (req, res)=> {
        res.render('studentadd')
})

router.post('/add', (req, res)=> {
    let info = "Success add Student"
  
    let data = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email
    }

    Model.Student.create(data)
    .then(()=> res.redirect(`/students?info=${info}`))
    .catch((err)=> res.redirect(`/students?info=${err}`))
})

router.get('/edit/:id', (req, res) => {
    let tempId = req.params.id

    Model.Student.find({where: {id: tempId}})
    .then(dataStudent => {
        // res.send(dataStudent)
        res.render('studentedit', {tempId: tempId, student: dataStudent})
    })
    .catch(err=> res.send(err))
    
})


router.post('/edit/:id', (req, res)=> {
    let info = "Success edit Student"
    let id = req.params.id

    let data = {
        id : id,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
    }
    
    Model.Student.update(data, {where: {
        id: id
    }})
    .then(()=> res.redirect(`/students?info=${info}`))
    .catch(err => res.redirect(`/students?err=${err}`))
})

router.get('/delete/:id', (req, res) => {
    let id = req.params.id
    let info = `Succes delete data dengan id ${id}`

    Model.Student.destroy({where: {id:id}})
    .then(() => res.redirect(`/students?info=${info}`))
    .catch(err => res.redirect(`/students?err=${err}`))
})

router.get('/:id/add-subject', (req, res)=> {
    let id = req.params.id
    let tempDataStudent = {}
    
    Model.Student.find({where: {id: id}})
    .then(dataStudent => {
        // res.send(dataStudent)
        tempDataStudent = dataStudent
        return Model.Subject.findAll()
    })
    .then(dataSubject =>   res.render('studentsubjectadd', {tempId: id, student: tempDataStudent, subject: dataSubject}))
    .catch(err=> res.send(err))

})

router.post('/:id/add-subject', (req, res)=> {
    let info = `Success enroll`
    let studentid = req.params.id
    let subjectid = req.body.SubjectId
    let objStudentSubject = {
        StudentId : studentid,
        SubjectId : subjectid
    }
    Model.StudentSubject.create(objStudentSubject)
    .then(()=> res.redirect(`/students?info=${info}`))
    .catch((err)=> res.redirect(`/students?err=${err}`))
})

module.exports = router