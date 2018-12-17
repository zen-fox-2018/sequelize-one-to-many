'use strict';
module.exports = (sequelize, DataTypes) => {
  const Op = sequelize.Op
  const Teacher = sequelize.define('Teacher', {
    First_Name: DataTypes.STRING,
    // {
    //   type: DataTypes.STRING,
    //   validate: {
    //     notEmpty: true,
    //     isNumeric: {
    //       args: false,
    //       msg: `Name could not contain number`
    //     }
    //   }
    // },
    Last_Name: DataTypes.STRING,
    // {
    //   type: DataTypes.STRING,
    //   validate: {
    //     notEmpty: true,
    //     isNumeric: {
    //       args: false,
    //       msg: `Name could not contain number`
    //     }
    //   }
    // },
    Email: //DataTypes.STRING,
    {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: `Please write the correct email format`
        },
        notEmpty: true,
        isUnique: function(email) {
          return Teacher.findOne({
            where: {Email: email , id: {[Op.ne] : this.id}}
          })
          .then(teachersMail => {
            if (teachersMail) {
              throw `Email is already been used`
            }
          })
          .catch(err => {
            throw new Error(err)
          })
        }
      }
    },
    SubjectId: DataTypes.INTEGER
  }, {});
  Teacher.associate = function(models) {
    // associations can be defined here
    Teacher.belongsTo(models.Subject)
  };
  return Teacher;
};