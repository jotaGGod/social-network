'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('post',
        [
          {
            description: 'Férias em Orlando',
            user_id: 1,
            target_id: 1,
            type_id: 2,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
          }
        ]
    );
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('post', null, {});
  }
};
