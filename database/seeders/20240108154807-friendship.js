'use strict';

const HashService = require("../../services/cryptoService");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('friendship',
        [
            {
                principal_user_id: 1,
                friend_id: 30,
                created_at: new Date(),
                updated_at: new Date(),
                is_active: true
            },
            {
                principal_user_id: 2,
                friend_id: 29,
                created_at: new Date(),
                updated_at: new Date(),
                is_active: true
            },
            {
                principal_user_id: 3,
                friend_id: 28,
                created_at: new Date(),
                updated_at: new Date(),
                is_active: true
            },
            {
                principal_user_id: 4,
                friend_id: 27,
                created_at: new Date(),
                updated_at: new Date(),
                is_active: true
            },
            {
                principal_user_id: 5,
                friend_id: 26,
                created_at: new Date(),
                updated_at: new Date(),
                is_active: true
            },
            {
                principal_user_id: 6,
                friend_id: 25,
                created_at: new Date(),
                updated_at: new Date(),
                is_active: true
            },
            {
                principal_user_id: 7,
                friend_id: 24,
                created_at: new Date(),
                updated_at: new Date(),
                is_active: true
            },
            {
                principal_user_id: 8,
                friend_id: 23,
                created_at: new Date(),
                updated_at: new Date(),
                is_active: true
            },
            {
                principal_user_id: 9,
                friend_id: 22,
                created_at: new Date(),
                updated_at: new Date(),
                is_active: true
            },
            {
                principal_user_id: 10,
                friend_id: 21,
                created_at: new Date(),
                updated_at: new Date(),
                is_active: true
            },
            {
                principal_user_id: 11,
                friend_id: 20,
                created_at: new Date(),
                updated_at: new Date(),
                is_active: true
            },
            {
                principal_user_id: 12,
                friend_id: 19,
                created_at: new Date(),
                updated_at: new Date(),
                is_active: true
            },
        ]
    );
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('friendship', null, {});
  }
};
