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
   let Students = [{
      firsName : 'maria',
      lastName:'ulfa',
      email: 'mariaulfa@mail.com',
      createdAt : new Date(),
      updatedAt : new Date()
   }, {
    firsName : 'ani',
    lastName:'budi',
    email: 'anibudi@mail.com',
    createdAt : new Date(),
    updatedAt : new Date()
 }]
   return queryInterface.bulkInsert('Students', Students, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Students', null, {});
  }
};
