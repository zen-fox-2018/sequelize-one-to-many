const express = require('express');
const router = express.Router();
const db = require('../models');


router.get('/', (req, res) => {

  db.Subject.findAll({
    include: [{
      model: db.Teacher
    }]
  })

  .then((result) => {
    console.log(result);
    // res.send(result)
    res.render('subject', { dataSubject: result });
  })
  .catch((err) => {
    res.send(err);
  });

});


module.exports = router;