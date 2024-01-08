'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('album',
        [
          {
            description: 'Férias em Orlando',
            target_id: 1,
            is_active: true,
            created_at: new Date(),
            updated_at: new Date()
          },
        ]
    );
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('album', null, {});
  }
};
