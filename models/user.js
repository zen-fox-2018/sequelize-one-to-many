'use strict';
module.exports = (sequelize, DataTypes) => {
  const crypto = require('crypto')
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    secret : DataTypes.STRING
  }, {hooks: {
    beforeCreate: (value) => {
      
      return new Promise ((resolve, reject)=> {
        crypto.randomBytes(40, (err,buf)=> {
          if(err) reject( err)
          else {
            value.secret = buf.toString('hex')
            console.log(value.secret);
            
            const hash = crypto.createHmac( 'sha256', value.secret)
                     .update(value.password)
                     .digest('hex');
  
                     console.log(hash);
                     
            value.password = hash     
            resolve(this)       
          }
        })
      })
    }
  }});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};