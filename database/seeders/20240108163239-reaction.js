'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('reaction',
        [
          {
            user_id: 30,
            reaction_type_id: 1,
            post_id: 1,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
          },
          {
            user_id: 30,
            reaction_type_id: 1,
            post_id: 1,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
          },
          {
            user_id: 30,
            reaction_type_id: 1,
            post_id: 2,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
          },
          {
            user_id: 29,
            reaction_type_id: 2,
            post_id: 2,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
          },
          {
            user_id: 29,
            reaction_type_id: 2,
            post_id: 3,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
          },
          {
            user_id: 29,
            reaction_type_id: 2,
            post_id: 3,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
          },
          {
            user_id: 28,
            reaction_type_id: 1,
            post_id: 4,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
          },
          {
            user_id: 28,
            reaction_type_id: 1,
            post_id: 4,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
          },
          {
            user_id: 27,
            reaction_type_id: 4,
            post_id: 4,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
          },
          {
            user_id: 26,
            reaction_type_id: 6,
            post_id: 17,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
          },
          {
            user_id: 25,
            reaction_type_id: 1,
            post_id: 11,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
          },
          {
            user_id: 24,
            reaction_type_id: 2,
            post_id: 12,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
          },
          {
            user_id: 23,
            reaction_type_id: 1,
            post_id: 17,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
          },
          {
            user_id: 22,
            reaction_type_id: 2,
            post_id: 16,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
          },
          {
            user_id: 21,
            reaction_type_id: 6,
            post_id: 17,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
          }
        ]
    );
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('reaction', null, {});
  }
};
