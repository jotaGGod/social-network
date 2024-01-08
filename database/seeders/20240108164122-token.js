'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('token',
        [
          {
            value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
                'eyJ1c2VySWQiOjEsImlhdCI6MTcwNDQ4MDg3NCwiZXhwIjoxNzA0OTEyODc0fQ.' +
                'K17bEP866bjQp60EB2YNzoUrFw-IIdQoNdH0JI__ECU',
            user_id: 1
          }
        ]
    );
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('token', null, {});
  }
};
