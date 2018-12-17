'use strict';
module.exports = (sequelize, DataTypes) => {
  const Op = sequelize.Op
  const Teacher = sequelize.define('Teacher', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type:DataTypes.STRING, 
      validate : {
        isEmail: {
          args: true, 
          msg:"email format is incorrect"
        },isUnique: function(value, next) {
          Teacher.find({
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
    },
    SubjectId: DataTypes.INTEGER
  }, {});
  Teacher.associate = function(models) {
    // associations can be defined here
    Teacher.belongsTo(models.Subject)
  };
  return Teacher;
};