'use strict';

const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    secret: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate : function (value) {
        // console.log('===================',value)
        return new Promise( (resolve, reject ) =>{ 
          crypto.randomBytes(20, (err, buf) => {
            if (err) {
              reject(err)
            } else {
              value.secret = buf.toString('hex')
              let hash = crypto.createHmac('sha256', value.secret)
                .update(value.password)
                .digest('hex');
              value.password = hash
              resolve(this)
            }
          })
        })
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    
  };
  return User;
};