const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const path = require('path');
const index = require('./routes/index');
const teachers = require('./routes/teachers');
const subjects = require('./routes/subjects');
const students = require('./routes/students');


app.set('view engine', 'ejs');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index)
app.use('/teachers', teachers);
app.use('/subjects', subjects);
app.use('/students', students);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))