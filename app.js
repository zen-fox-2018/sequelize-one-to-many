const express = require('express')
const app = express()
// const Model = require('./models')
const Teacher = require('./routes/teacher-r.js')
const Subject = require('./routes/subject-r.js')

app.set('view engine','ejs')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/teachers', Teacher)
app.use('/subjects', Subject)


app.get('/', (req,res)=>{
    res.send('I love hacktiv8')
})


app.listen(3000, function(){
    console.log(`server listening to port 3000`)
})