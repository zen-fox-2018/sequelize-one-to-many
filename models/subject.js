'use strict';
module.exports = (sequelize, DataTypes) => {
  const Op = sequelize.Op
  const Subject = sequelize.define('Subject', {
    subjectName: {
      type:DataTypes.STRING,
      validate : {
        isUnique: function(value, next) {
          Subject.find({
            where:{subjectName: value , id :{[Op.ne] : this.id}}
          })
         .then(data=> {
           if(data)  next(`Subject sudah ada`)
           else next()
         })
         .catch(err => {
           next(err)
         })
        }
      }
    }
  }, {});
  Subject.associate = function(models) {
    // associations can be defined here
    Subject.hasMany(models.Teacher)
    Subject.belongsToMany(models.Student, {through: models.StudentSubject})
  };
  return Subject;
};