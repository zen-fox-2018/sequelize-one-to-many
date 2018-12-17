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
      let subject = [{
        subjectName : 'Arts', createdAt: new Date(), updatedAt: new Date()
      }, {subjectName:'Math',createdAt: new Date(), updatedAt: new Date()}]

   return queryInterface.bulkInsert('Subjects', subject, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Subject', null, {});
  }
};
