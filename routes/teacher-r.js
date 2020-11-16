const express = require('express')
const router = express.Router()
const Model = require('../models')


router.get('/add',(req,res)=>{    
    Model.Subject.findAll()
    .then((dataSubject)=>{
        res.render('addTeacher.ejs',{subjects : dataSubject})
    })
    .catch(err=>{
        res.send(err)
    })
})

router.get('/delete/:id',(req,res)=>{
    let search_id = req.params.id
    Model.Teacher.destroy({
        where: {
            id : search_id
        }
    })
    .then(()=>{
        res.redirect('/teachers')
    })
    .catch(err=>{
        res.send(err)
    })
})

router.post('/add',(req,res)=>{
    let newTeacher = req.body
    let objTeacher = {
        firstName : newTeacher['first_name'],
        lastName : newTeacher['last_name'],
        email : newTeacher['email'],
        SubjectId : newTeacher['SubjectId']
    }
    Model.Teacher
    .create(objTeacher)
    .then(()=>{
        res.redirect('/teachers')
    })
    .catch(err=>{
        res.send(err)
    })
})

router.get('/',(req,res) =>{
    Model.Teacher
    .findAll({
        include : [
            {
                model : Model.Subject
            }
        ]
    })
    .then(allTeacherData=>{
        res.render('teacher.ejs', { data: allTeacherData })
        // res.send(allTeacherData)
    })
    .catch(err=>{
        res.send(err)
    })
})

router.get('/edit/:id', (req,res)=>{
    let search_id = req.params.id
    let dataGuru = null
    Model.Teacher
    .findOne({
        where : {
            id : search_id
        }
    })
    .then(dataTeacher => {
        dataGuru = dataTeacher
        // res.send(dataTeacher)
        return Model.Subject.findAll()
    })
    .then(dataSubject=>{
        res.render('editTeacherData.ejs',{
            data : dataGuru,
            subjects: dataSubject
        })
        // // res.send(dataSubject)
        // console.log(dataSubject)
    })
    .catch(err=>{
        res.send(err)
    })
})

router.post('/edit/:id', (req,res)=>{
    let search_id = req.params.id
    let editedData = req.body
    Model.Teacher
    .update({
        id : search_id,
        firstName : editedData['first_name'],
        lastName : editedData['last_name'],
        email : editedData['email'],
        SubjectId : editedData['SubjectId']
    }, {
        where : {
            id : search_id
        }
    })
    .then(()=>{
        res.redirect('/teachers')
    })
    .catch(err=>{
        res.send(err)
    })
})




module.exports = router