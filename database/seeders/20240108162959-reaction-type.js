'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('reaction_type',
        [
          {
            description: 'like',
            is_active: true
          },
          {
            description: 'love',
            is_active: true
          },
          {
            description: 'sad',
            is_active: true
          },
          {
            description: 'happy',
            is_active: true
          }
        ]
    );
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('reaction_type', null, {});
  }
};
