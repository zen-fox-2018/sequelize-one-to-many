'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert( 'Teachers', 
    [{
      firstName: 'Ganang',
      lastName: 'Wahyu',
      email: 'gananggww@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      subjectId : null 
    },
    {
      firstName: 'Ibeng',
      lastName: 'Wahyu',
      email: 'ibengwahyu@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      subjectId: null 
    }])
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete( 'Teachers', null)
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
