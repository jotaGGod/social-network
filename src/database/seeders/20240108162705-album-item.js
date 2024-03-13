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
            {
                post_id: 2,
                album_id: 1,
                created_at: new Date(),
                updated_at: new Date(),
                is_active: true
            },
            {
                post_id: 3,
                album_id: 1,
                created_at: new Date(),
                updated_at: new Date(),
                is_active: true
            },
            {
                post_id: 4,
                album_id: 2,
                created_at: new Date(),
                updated_at: new Date(),
                is_active: true
            },
            {
                post_id: 5,
                album_id: 2,
                created_at: new Date(),
                updated_at: new Date(),
                is_active: true
            },
            {
                post_id: 6,
                album_id: 2,
                created_at: new Date(),
                updated_at: new Date(),
                is_active: true
            },
            {
                post_id: 7,
                album_id: 3,
                created_at: new Date(),
                updated_at: new Date(),
                is_active: true
            },
            {
                post_id: 8,
                album_id: 3,
                created_at: new Date(),
                updated_at: new Date(),
                is_active: true
            },
            {
                post_id: 9,
                album_id: 4,
                created_at: new Date(),
                updated_at: new Date(),
                is_active: true
            },
            {
                post_id: 10,
                album_id: 5,
                created_at: new Date(),
                updated_at: new Date(),
                is_active: true
            },
            {
                post_id: 11,
                album_id: 6,
                created_at: new Date(),
                updated_at: new Date(),
                is_active: true
            },
            {
                post_id: 12,
                album_id: 7,
                created_at: new Date(),
                updated_at: new Date(),
                is_active: true
            },
            {
                post_id: 13,
                album_id: 8,
                created_at: new Date(),
                updated_at: new Date(),
                is_active: true
            },
            {
                post_id: 14,
                album_id: 9,
                created_at: new Date(),
                updated_at: new Date(),
                is_active: true
            },
            {
                post_id: 15,
                album_id: 10,
                created_at: new Date(),
                updated_at: new Date(),
                is_active: true
            }
        ]
    );
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('album_item', null, {});
  }
};
