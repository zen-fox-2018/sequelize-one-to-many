'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student_Subject = sequelize.define('Student_Subject', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER,
    Score: DataTypes.INTEGER
  }, {});
  Student_Subject.associate = function(models) {
    // associations can be defined here
    // Student_Subject.hasMany(models.Student)
    // Student_Subject.hasMany(models.Subject)
  };
  return Student_Subject;
};