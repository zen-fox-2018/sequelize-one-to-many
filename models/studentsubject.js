'use strict';
module.exports = (sequelize, DataTypes) => {
  const StudentSubject = sequelize.define('StudentSubject', {
    StudentId:DataTypes.INTEGER,
    SubjectId:DataTypes.INTEGER,
    score:DataTypes.INTEGER,
    StudentSubjectId: DataTypes.INTEGER
  }, {});
  StudentSubject.associate = function(models) {
    // associations can be defined here
  };
  return StudentSubject;
};