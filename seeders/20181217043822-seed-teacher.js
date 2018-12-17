'use strict';
const fs = require('fs');

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
    var data = fs.readFileSync('./teacherseed.csv', 'utf8');
    var dataSplitEnter = data.split('\n');
    var result = [];
    dataSplitEnter.forEach(item =>{
      var data = item.split(',');
      if (item.length>0) {
        var obj = {
          first_name : data[1],
          last_name : data[2],
          email : data[3],
          createdAt : new Date(),
          updatedAt : new Date()
        }
        result.push(obj)
      }
    })
    return queryInterface.bulkInsert('Teachers', result)
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Teachers', null, {})
  }
};
