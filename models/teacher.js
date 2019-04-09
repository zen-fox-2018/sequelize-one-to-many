'use strict';
module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('Teacher', {
    firstName: DataTypes.STRING,
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
      }},
    SubjectId : DataTypes.INTEGER
  }, {});
  Teacher.associate = function(models) {
    Teacher.belongsTo (models.Subject)
  };
  return Teacher;
};