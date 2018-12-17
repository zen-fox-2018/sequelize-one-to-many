'use strict';
const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail : {
          args : true,
          msg : 'Email is not valid'
        },
        isUnique : function(email){
          return Teacher.findOne({
            where : {
              email : email,
              id : {
                [Op.ne] : this.id
              }
            }
          })
          .then((data)=>{
            if (data != null && data.dataValues.email == email)
            throw new Error('email already registered');
          })
          .catch(err =>{
            // console.log(err);
            throw err
          })
        }
      }
    },
    SubjectId: DataTypes.INTEGER
  }, {});
  Teacher.associate = function(models) {
    // associations can be defined here
    Teacher.belongsTo(models.Subject, {foreignKey : 'SubjectId'})
  };
  return Teacher;
};
