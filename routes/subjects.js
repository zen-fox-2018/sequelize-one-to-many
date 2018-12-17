const router = require('express').Router();
const Model = require('../models');

router.get('/', (req, res) => {
  Model.Subject.findAll({
    include: [{
      model: Model.Teacher
    }]
  })
  .then((subjects) => {
    res.render('subjects', {
      title: 'SUBJECTS',
      subjects : subjects
    })
  })
})

module.exports = router;