const express = require('express')
const router = express.Router()
const Model = require('../models')

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

module.exports = router