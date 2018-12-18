const Model = require('./models');

Model.User.create({
  user : 'Luthfi',
  password : 'bawang'
})
.then(data =>{
  console.log(data);
})
.catch(err =>{
  console.log(err);
})
