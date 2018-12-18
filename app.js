const express = require('express')
const app = express()
const port = 3000
const Index = require('./routes/index')
const Teacher = require('./routes/teacher')
const Subject = require('./routes/subject')
const Student = require('./routes/student')
const User = require('./routes/user')

app.set("view engine", "ejs")

app.use(express.urlencoded({extended:false}))

app.use('/', Index)
app.use('/teachers', Teacher)
app.use('/subjects', Subject)
app.use('/students', Student)
app.use('/register', User)



app.listen(port , () => console.log(`Server running in port : ${port}`))