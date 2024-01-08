'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('target_public',
        [
            {
                type: 'public',
                is_active: true
            },
            {
                type: 'friends',
                is_active: true
            },
            {
                type: 'private',
                is_active: true
            }
        ]
    );
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('target_public', null, {});
  }
};
