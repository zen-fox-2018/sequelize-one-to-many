'use strict';
const encrypt = require('../helpers/encrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    secret: DataTypes.STRING
  }, {
    hooks : {
      beforeCreate: (value)=> {
        let generate = encrypt(value.password)
        value.password = generate.hash
        value.secret = generate.secret
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};