'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('album_item',
        [
          {
            post_id: 1,
            album_id: 1,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
          },
        ]
    );
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('album_item', null, {});
  }
};
