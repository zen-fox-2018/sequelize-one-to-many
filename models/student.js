'use strict';
module.exports = (sequelize, DataTypes) => {
  const Op = sequelize.Op
  const Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email:
    {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: `Please write the correct email format`
        },
        notEmpty: true,
        isUnique: function(email) {
          return Student.findOne({
            where: {email: email , id: {[Op.ne] : this.id}}
          })
          .then(studentsMail => {
            if (studentsMail) {
              throw `Email is already been used`
            }
          })
          .catch(err => {
            throw new Error(err)
          })
        }
      }
    },
  }, {
    uniqueKeys: {
        actions_unique: {
            fields: ['first_name']
        }
    }
  });
  Student.associate = function(models) {
    // associations can be defined here
    Student.belongsToMany(models.Subject, {through: models.Student_Subject})
  };
  return Student;
};