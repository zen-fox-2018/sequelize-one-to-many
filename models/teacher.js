'use strict';
module.exports = (sequelize, DataTypes) => {
  const op = sequelize.Op;
  const Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      validate: {
        isEmail: true, 
        isUnique(value, next) {
          Teacher.findOne({
            where: {
              email: value,
              id : {[op.ne] : this.id},
              
            }
          })
          .then(data => {
            if(data){
              next("email already in use")
            } else{
              next()
            }
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