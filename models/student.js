'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate : {
        isEmail: true,
        isUnique: function( value ) {
          return Student.findOne( { where : { email : value } } )
            .then( student => {
              if (student !== null && this.id != student.id) {
                throw 'Email is already used'
              }
            })
            .catch( err => {
              throw err
            })
        } 
      }
    }
  }, {});
  Student.associate = function(models) {
    // associations can be defined here
    Student.belongsToMany( models.Subject, { through : models.StudentSubject } )
  };
  return Student;
};