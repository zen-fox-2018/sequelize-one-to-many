// Load express Modules
const express = require('express');
const app = express();
const index = require('./routes/index');
const teacher = require('./routes/teacher');
const subject = require('./routes/subject');

app.use('/public', express.static(process.cwd() + '/public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/', index);
app.use('/teachers', teacher);
app.use('/subjects', subject);


app.listen(3000, () => {
  console.log('Running on port 3000');
});