const express = require('express')
const router = express.Router()
const Model = require('../models')

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

module.exports = router