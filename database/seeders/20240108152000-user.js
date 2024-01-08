'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('user',
      [
        {
          full_name: 'Jackson Santana',
          email: 'jackson@example.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.8AM3p6JjhZmsfW',
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          full_name: 'Renato Cariani',
          email: 'tiozao@example.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.8AM3p6Jevrgb23RR',
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        }
      ]
    );
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('user', null, {});
  }
};
