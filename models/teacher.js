const sequelize = require('sequelize')
const Op = sequelize.Op

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('Teacher', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      validate : {        
        isUnique : function(value){          
          return Teacher.findOne({
            where : {
              email:value,
              id : {
                [Op.ne] : this.id
              }
            }            
          })
          .then((data)=>{
            if(data){
              throw `email already registered`
            }            
          })
          .catch(err=>{
            throw new Error(err)
          })
        },
        isEmail : {
          args:true,
          msg: `Email format is wrong!`
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