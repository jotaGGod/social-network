'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('album',
        [
            {
                description: 'Férias em Orlando',
                target_id: 1,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                description: 'Férias nas Maldivas',
                target_id: 1,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                description: 'Aniversário de 40 anos',
                target_id: 2,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                description: 'Aniversário da irmãzinha',
                target_id: 2,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                description: 'Ubatubão',
                target_id: 1,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                description: 'Meu job',
                target_id: 2,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                description: 'Casa nova',
                target_id: 1,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                description: 'Formatura',
                target_id: 1,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                description: 'Grupo de estudos',
                target_id: 2,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                description: 'Cabana no Alaska',
                target_id: 4,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date()
            }
        ]
    );
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('album', null, {});
  }
};
