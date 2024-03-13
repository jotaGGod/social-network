'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('file_type',
        [
          {
            type: 'png',
            is_active: true
          },
          {
            type: 'jpeg',
            is_active: true
          },
          {
            type: 'mp4',
            is_active: true
          },
          {
            type: 'gif',
            is_active: true
          }
        ]
    );
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('file_type', null, {});
  }
};
