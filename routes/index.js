const router = require('express').Router();
const Model = require('../models');

router.get('/', (req, res) => {
  res.render('index', {
    title : 'KANGMAN SCHOOL',
    message : 'Hello there, Sign up and Join with Us'
  })
})

module.exports = router;