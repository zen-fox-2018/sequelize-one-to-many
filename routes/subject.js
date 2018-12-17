const express = require('express')
const router = express.Router()
const Model = require('../models')


router.get('/', (req, res)=> {
    let info = req.query.info
    let err = req.query.err
    Model.Subject.findAll({include: [{model: Model.Teacher, required:false}]})
    .then(dataSubject => {
        // res.send(dataSubject)
        res.render('subject' , {dataSend:dataSubject, info:info, err:err})
    })
    .catch(err => res.send(err))
   
})

router.get('/add', (req, res) => {
    
    res.render('subjectadd')
})

router.post('/add' ,(req, res)=> {
    let info = "Success add Subject"
    let objSubject = {
        subjectName :req.body.subjectName
    }
    Model.Subject.create(objSubject)
    .then(()=> res.redirect(`/subjects?info=${info}`))
    .catch(err => res.redirect(`/subjects?err=${err}`))
})


router.get('/edit/:id' , (req, res)=> {
    let tempId = req.params.id

    Model.Subject.find({where : {id:tempId}})
    .then(dataSubject => {
        res.render('subjectedit', {tempId:tempId, subject: dataSubject})
    })
    .catch(err => res.send(err))
})


router.post('/edit/:id', (req, res) => {
    let info = "Success edit Subject"
    let tempId = req.params.id 
    let objSubject = {
        id :tempId,
        subjectName :req.body.subjectName
    }
    Model.Subject.update(objSubject,{where: {id:tempId}})
    .then(()=> res.redirect(`/subjects?info=${info}`))
    .catch(err => res.redirect(`/subjects?err=${err}`))
})

router.get('/delete/:id', (req, res) => {
    let info = "Success delete Subject"
    let tempId = req.params.id

    Model.Subject.destroy({where: {id: tempId}})
    .then(()=> res.redirect(`/subjects?info=${info}`))
    .catch(err => res.redirect(`/subjects?err=${err}`))
})

router.get('/:id/enrolled-students', (req, res) => {
    let tempId = req.params.id
    Model.Subject.find({
        include : [{model: Model.Student, required: false}], 
        where :{id:tempId}
    })
    .then(dataSubject => {
        // res.send(dataSubject)
        res.render('subjectenrolled', {subject: dataSubject})
    })
    .catch(err => res.send(err))
}) 

router.get('/:id/give-score', (req, res)=> {
    let id = req.params.id
    res.render('formaddscore', {id:id})
})

router.post('/:id/give-score', (req,res)=> {
    let info = `Success Add Score`
    let id = req.params.id
    let score = req.body.score
    let objUpdateStudentSubject = {
        score: score
    }
    Model.StudentSubject.update(objUpdateStudentSubject, {where:{id:id}})
    .then(()=> res.redirect(`/subjects?info=${info}`))
    .catch(err => res.redirect(`/subjects?err=${err}`))
})
module.exports = router