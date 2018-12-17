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
    return queryInterface.bulkInsert('Teachers', [
      {
        firstName : 'Bambang',
        lastName : 'Suprapto',
        email : 'bambangsuprapto@sekolah.id'
      },
      {
        firstName : 'Rukmana',
        lastName : 'Fatmawati',
        email : 'rukamanfatmawati@sekolah.id'
      },
      {
        firstName : 'Butet',
        lastName : 'Naiborhu',
        email : 'butetnaiborhu@sekolah.id'
      },
      {
        firstName : 'Yulius',
        lastName : 'Prawiranegara',
        email : 'yuliusprawiranegara@sekolah.id'
      }

  ], {});
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
