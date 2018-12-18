'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  return queryInterface.bulkInsert('Subjects', [{
    subject_name: 'Ekonomi',
    Teacher: null,
    TeacherId: null,
    createdAt: new Date,
    updatedAt: new Date
    },{
    subject_name: 'Fisika',
    Teacher: null,
    TeacherId: null,
    createdAt: new Date,
    updatedAt: new Date
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
