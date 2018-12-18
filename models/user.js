'use strict';
const encrypt = require('../helpers/encrypt.js');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user: DataTypes.STRING,
    password: DataTypes.STRING,
    secret: DataTypes.STRING
  }, {
    hooks : {
      beforeCreate : (value) => {
        let encryptPass = encrypt(value.password);
        value.password = encryptPass.hash;
        value.secret = encryptPass.secret;
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
