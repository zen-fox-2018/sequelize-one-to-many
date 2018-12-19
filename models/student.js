'use strict';
module.exports = (sequelize, DataTypes) => {
  const Op = sequelize.Op
  const Student = sequelize.define('Student', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        isUnique: function( value ) {
          return Teacher.findOne( { where : { email : value, id : { [Op.ne] : this.id } } } )
          .then( student => {
              if (student) { // this.id != student.id
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