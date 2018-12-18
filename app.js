const express = require('express')
const app = express()
const teacher = require('./routes/teacher.js')
const subject = require('./routes/subject.js')
const student = require('./routes/student.js')

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/teacher', teacher)
app.use('/subject', subject)
app.use('/student', student)

app.get('/', (req,res) =>{
  res.render('home.ejs')
})

app.listen(3000,()=>{
  console.log('server is listening on port 3000....')
})


