'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up:(queryInterface, Sequelize) => {
    return queryInterface.createTable('friendship_request_type', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      }
    });
  },
  down: (queryInterface) => {
     return queryInterface.dropTable('friendship_request_type');
  }
};