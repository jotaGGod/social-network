'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('reaction',
        [
          {
            user_id: 2,
            reaction_type_id: 1,
            post_id: 1,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
          },
        ]
    );
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('reaction', null, {});
  }
};
