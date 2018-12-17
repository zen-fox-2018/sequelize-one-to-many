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
    return queryInterface.bulkInsert('Teachers', [{
      First_Name: 'Bambang',
      Last_Name: 'Suprapto',
      Email: 'bambangsuprapto@sekolah.id',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      First_Name: 'Rukmana',
      Last_Name: 'Fatmawati',
      Email: 'rukmanafatmawati@sekolah.id',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      First_Name: 'Butet',
      Last_Name: 'Naiborhu',
      Email: 'butetnaiborhu@sekolah.id',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      First_Name: 'Yulius',
      Last_Name: 'Prawiranegara',
      Email: 'yuliusprawiranegara@sekolah.id',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Teachers', null, {});
  }
};
