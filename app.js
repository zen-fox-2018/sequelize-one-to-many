const express = require('express')
const app = express()
// const Model = require('./models')
const Teacher = require('./routes/teacher-r.js')
const Subject = require('./routes/subject-r.js')
const Student = require('./routes/student-r')
const Register = require('./routes/register-r')

app.set('view engine','ejs')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/teachers', Teacher)
app.use('/subjects', Subject)
app.use('/students', Student)
app.use('/register', Register)


app.get('/', (req,res)=>{
    res.render('about.ejs')
})


app.listen(3000, function(){
    console.log(`server listening to port 3000`)
})