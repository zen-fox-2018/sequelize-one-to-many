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
          console.log(this.id);
          return Student.findOne( { where : { email : value } } )
          .then( student => {
            console.log('========',value)
            console.log(student.id);
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