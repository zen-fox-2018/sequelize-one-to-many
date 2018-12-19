const express = require('express')
const app = express()
const subjects = require('./routes/subjectRoutes')
const teachers = require('./routes/teacherRoutes')
const students = require('./routes/studentRoutes')
const test     = require('./routes/registerRoutes')

let port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended : false}))

app.get('/', function(req, res) { // ini bisa dipindahkan ke indexRoutes.js
  res.send('Ini express')
})

app.use('/subjects', subjects)
app.use('/teachers', teachers)
app.use('/students', students)
app.use('/register', test)

app.listen(port, function(err) {
  console.log('listening to port', port);
})
