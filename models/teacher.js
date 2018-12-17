'use strict';
const sequelize = require('sequelize');
const Op = sequelize.Op
module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('Teacher', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/i,
          msg: 'Please input valid email'
        },
        isUnique: function (value) {
          return Teacher.findOne({
            where: {
              email: value,
              id: { [Op.ne]: this.id }
            }
          })
          
          .then((result) => {
            if(result) throw new Error('errno already registered')
          })
          .catch((err) => {
            throw err
          });
        }
      }
    },
    SubjectId: DataTypes.INTEGER
  }, {});
  Teacher.associate = function (models) {
    // associations can be defined here
    Teacher.belongsTo(models.Subject);
  };

  return Teacher;
};