'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    return queryInterface.bulkInsert('friendship_request_type',
        [
          {
            type: 'awaiting approval'
          },
          {
            type: 'accepted'
          },
          {
            type: 'rejected'
          }
        ]
    );
  },
  async down (queryInterface) {
    return queryInterface.bulkDelete('friendship_request_type', null, {});
  }
};
