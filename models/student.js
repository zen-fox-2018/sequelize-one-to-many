'use strict';
module.exports = (sequelize, DataTypes) => {
  const Op = sequelize.Op
  const Student = sequelize.define('Student', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type:DataTypes.STRING, 
      validate : {
        isEmail: {
          args: true, 
          msg:"email format is incorrect"
        },isUnique: function(value, next) {
          Student.find({
            where:{email: value , id :{[Op.ne] : this.id}}
          })
         .then(data=> {
           if(data)  next(`Email already used`)
           else next()
         })
         .catch(err => {
           next(err)
         })
        }
      }
    }
  }, {});
  Student.associate = function(models) {
    // associations can be defined here
    Student.belongsToMany(models.Subject , {through: models.StudentSubject})
  };
  return Student;
};