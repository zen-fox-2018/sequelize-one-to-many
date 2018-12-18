const Model = require('../models');

let newUser = {
    username : 'haris',
    password : '12356',
    role : 'dokter'
}
Model.User.create(newUser)
    .then((user) => {
        console.log(user);
        
    })

    .catch((err) => {
        console.log(err);
        
    })