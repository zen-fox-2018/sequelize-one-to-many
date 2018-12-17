'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    firsName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email : {type : DataTypes.STRING, 
      validate : {
        isEmail: true,
        isUnique : function (value) {
           return Teacher
            .findOne({where: {email : value}})
            .then(data => {
              if(data !== null) {
                if(data.dataValues.id != this.id ) {
                  throw new Error ('Email already exists!')
                }
              }
            })
            .catch(function(err) {
              throw err
            })
          }       
      }}
  }, {});
  Student.associate = function(models) {
    // associations can be defined here
    Student.belongsToMany(models.Subject,
      {through : models.SubjectStudent})
  };
  return Student;
};