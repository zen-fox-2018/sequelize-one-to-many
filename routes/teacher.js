const express = require('express')
const router = express.Router()
const Model =  require('../models')


router.get('/', (req, res)=> {
    let info = req.query.info
    let err = req.query.err
    
    Model.Teacher.findAll({
        include:[{model: Model.Subject , required: false}] , order: [[ 'id', 'ASC' ]]
    })
    .then(dataAll => {
        res.render('teacher', {dataSend: dataAll, info:info, err:err} )
        // res.send(dataAll)
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/add', (req, res)=> {
    Model.Subject.findAll()
    .then(dataSubject => {
        res.render('teacheradd' , {subject: dataSubject})
    })
    .catch(err => res.send(err))
    
})

router.post('/add', (req, res)=> {
    let info = "Success add Teacher"
    let SubjectId = null

    if(req.body.SubjectId){
        SubjectId = req.body.SubjectId
    }

    let data = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        SubjectId : SubjectId
    }

    Model.Teacher.create(data)
    .then(()=> res.redirect(`/teachers?info=${info}`))
    .catch((err)=> res.redirect(`/teachers?info=${err}`))
})

router.get('/edit/:id', (req, res) => {
    let tempId = req.params.id
    let tempSubject = []

    Model.Subject.findAll()
    .then(dataSubject => {
        tempSubject = dataSubject
        // res.send('Masuk')
        return Model.Teacher.find({ where: {id: tempId}})
    })
    .then(dataTeacher =>  {
        // res.send(dataTeacher)
        
         res.render('teacheredit' , {tempId: tempId , subject: tempSubject, teacher:dataTeacher})
        })
    .catch(err => res.send(err))
    
})


router.post('/edit/:id', (req, res)=> {
    let info = "Success edit Teacher"
    let id = req.params.id
    let SubjectId = null

    if(req.body.SubjectId){
        SubjectId = req.body.SubjectId
    }
    let data = {
        id : id,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        SubjectId : SubjectId
    }
    
    Model.Teacher.update(data, {where: {
        id: id
    }})
    .then(()=> res.redirect(`/teachers?info=${info}`))
    .catch(err => res.redirect(`/teachers?err=${err}`))
})

router.get('/delete/:id', (req, res) => {
    let id = req.params.id
    let info = `Succes delete data dengan id ${id}`

    Model.Teacher.destroy({where: {id:id}})
    .then(() => res.redirect(`/teachers?info=${info}`))
    .catch(err => res.redirect(`/teachers?err=${err}`))
})

module.exports = router