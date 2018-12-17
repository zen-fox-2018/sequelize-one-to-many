'use strict';
module.exports = (sequelize, DataTypes) => {
  const StudentSubject = sequelize.define('StudentSubject', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER,
    score: DataTypes.FLOAT
  }, {});
  StudentSubject.associate = function(models) {
    // associations can be defined here
    // StudentSubject.belongsTo(models.Students)
  };
  return StudentSubject;
};