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
   let objStudent =[{
    firstName: "Christian",
    lastName: "Suprapto",
    email: "christiansuprapto@sekolah.id"
  },{
    firstName: "Laksama",
    lastName: "Fatmawati",
    email: "laksamanafatmawati@sekolah.id"
  },{
    firstName: "Butet",
    lastName: "Nainggolan",
    email: "butetnainggolan@sekolah.id"
  },{
    firstName: "Lawson",
    lastName: "Prawinegara",
    email: "lawsonprawinegara@sekolah.id"
  }]
  return queryInterface.bulkInsert('Students', objStudent, {})


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
