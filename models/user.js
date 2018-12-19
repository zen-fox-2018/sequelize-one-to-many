'use strict';

const crypto = require('crypto');
const passwordEncrypt = require('../helpers/password')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    secret: DataTypes.STRING
  }, {
    // hooks: {
      // beforeCreate : (value) => {
      //   // console.log('===================',value)
      //   // return new Promise( (resolve, reject ) =>{ 
      //   //   crypto.randomBytes(20, (err, buf) => {
      //   //     if (err) {
      //   //       reject(err)
      //   //     } else {
      //   //       value.secret = buf.toString('hex')
      //   //       let hash = crypto.createHmac('sha256', value.secret)
      //   //         .update(value.password)
      //   //         .digest('hex');
      //   //       value.password = hash
      //   //       resolve(this)
      //   //     }
      //   //   })
      //   // })
      //   console.log(value, '%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
      //   passwordEncrypt(value)
      // }
    // }
  });
  User.associate = function(models) {
    // associations can be defined here
      
  };

  User.beforeCreate((user) => {
    let secret = Math.floor(Math.random()*100000)
    let hash = crypto.createHmac('sha256', 'bebas')
                .update(user.password)
                .digest('hex');
    user.password = hash
    user.secret = secret
  });

  return User;
};