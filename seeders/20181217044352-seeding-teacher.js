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
   let objTeacher =[{
    firstName: "Bambang",
    lastName: "Suprapto",
    email: "bambangsuprapto@sekolah.id"
  },{
    firstName: "Rukmana",
    lastName: "Fatmawati",
    email: "rukmanafatmawati@sekolah.id"
  },{
    firstName: "Butet",
    lastName: "Naiborhu",
    email: "butetnaiborhu@sekolah.id"
  },{
    firstName: "Yulius",
    lastName: "Prawinegara",
    email: "yuliusprawinegara@sekolah.id"
  }]

    return queryInterface.bulkInsert('Teachers', objTeacher, {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */

    return queryInterface.bulkDelete('Teachers', null , {})
  }
};
