'use strict';
module.exports = (sequelize, DataTypes) => {
  const op = sequelize.Op;
  const Teacher = sequelize.define('Teacher', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      validate : {
        isEmail : true,
        isUnique (value, next) {
          Teacher.findOne({
            where : {
              email : this.email,
              id : {
                [op.ne] : this.id
              }
            }
          })
            .then((teacher) => {
              if (teacher) {
                next('Email already used');
              } else {
                next();
              }
            })

            .catch((err) => {
              next(err);
            })
        }
      }
    },
    SubjectId: DataTypes.INTEGER
  }, {});
  Teacher.associate = function(models) {
    // associations can be defined here
    Teacher.belongsTo(models.Subject);
  };
  return Teacher;
};