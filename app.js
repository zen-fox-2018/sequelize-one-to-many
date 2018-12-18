const express = require('express');
const app = express();
const teacher = require('./routes/teachers.js');
const subject = require('./routes/subjects.js');
const student = require('./routes/students.js')


app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.use('/teachers',teacher);
app.use('/subjects',subject);
app.use('/students',student);

app.get('/', (req, res)=> {
  res.render('home.ejs')
})


app.listen(3000, () =>{
  console.log('listen to port 3000');
})
