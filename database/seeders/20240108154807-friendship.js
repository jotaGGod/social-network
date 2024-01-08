'use strict';

const HashService = require("../../services/cryptoService");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('friendship',
        [
          {
            principal_user_id: 1,
            friend_id: 2,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
          }
        ]
    );
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('friendship', null, {});
  }
};
