'use strict';
module.exports = (sequelize, DataTypes) => {
  const Op = sequelize.Op
  const Teacher = sequelize.define('Teacher', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        isUnique: function(value) {
          return Teacher.findOne( { where : { email : value, id : { [Op.ne] : this.id } } } )
            .then( teacher => {
                if (teacher) { // !== null && this.id != teacher.id
                  throw 'Email is already used'
                }
              })
            .catch( err => {
              throw err
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
// ===========================