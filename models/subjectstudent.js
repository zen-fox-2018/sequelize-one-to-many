'use strict';
module.exports = (sequelize, DataTypes) => {
  const SubjectStudent = sequelize.define('SubjectStudent', {
    SubjectId: DataTypes.INTEGER,
    StudentId: DataTypes.INTEGER,
    score : DataTypes.INTEGER
  }, {});
  SubjectStudent.associate = function(models) {
    // associations can be defined here
    // SubjectStudent.hasMany(models.Student)
    // SubjectStudent.hasMany(models.Subject)
    
  };
  return SubjectStudent;
};