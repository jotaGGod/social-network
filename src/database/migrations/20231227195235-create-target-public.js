'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: async(queryInterface, Sequelize) => {
    await queryInterface.createTable('target_public', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      is_active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    });
  },
  down: async(queryInterface, Sequelize) => {
    await queryInterface.dropTable('target_public');
  }
};