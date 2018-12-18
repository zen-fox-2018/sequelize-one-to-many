const express = require('express')
const app = express()
const port = 3000
const teacher = require('./routes/teacher.js') //route teacher
const subject = require('./routes/subject.js') //route subject
const students = require('./routes/student.js') //route student
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.use('/teacher', teacher)
app.use('/subject', subject)
app.use('/students', students)

app.get('/', (req, res) => {
    res.render('./homepage')
})

app.listen(port, function() {
    console.log(`Server is listening on port ${port}`)
})