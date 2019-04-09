'use strict'

// const Model = require('./models')
const express = require('express')
const teacher = require('./routes/teacher')
const subject = require('./routes/subject')
const student = require('./routes/student')
const app = express()
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))


app.get('/', function(req, res) {
  res.render('home.ejs')
})


app.use('/teacher', teacher)
app.use('/subject', subject)
app.use('/student', student)


app.listen(3000, function(){
  console.log('Port 3000')
})
