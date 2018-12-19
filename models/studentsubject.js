'use strict';
module.exports = (sequelize, DataTypes) => {
  const StudentSubject = sequelize.define('StudentSubject', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER,
    score: {
      type: DataTypes.INTEGER,
      validate : {
        
      }
    }
  }, {});
  StudentSubject.associate = function(models) {
    // associations can be defined here
    
  };
  return StudentSubject;
};