'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('user',
      [
        {
          full_name: 'Jackson Santana',
          email: 'jackson@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.1',
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          full_name: 'Renato Cariani',
          email: 'tiozao@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.2',
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          full_name: 'Fernanda Oliveira',
          email: 'fernanda@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.3',
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          full_name: 'Lucas Silva',
          email: 'lucas@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.4',
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          full_name: 'Camila Pereira',
          email: 'camila@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.5',
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          full_name: 'Rafael Martins',
          email: 'rafael@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.6',
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          full_name: 'Amanda Oliveira',
          email: 'amanda@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.7',
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          full_name: 'Pedro Almeida',
          email: 'pedro@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.8',
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          full_name: 'Larissa Santos',
          email: 'larissa@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.9',
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          full_name: 'Gustavo Lima',
          email: 'gustavo@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.10',
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          full_name: 'Ana Oliveira',
          email: 'ana@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.11',
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          full_name: 'Carlos Silva',
          email: 'carlos@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.12',
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          full_name: 'Mariana Costa',
          email: 'mariana@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.13',
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          full_name: 'Ricardo Oliveira',
          email: 'ricardo@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.14',
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          full_name: 'Isabela Santos',
          email: 'isabela@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.15',
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          full_name: 'Leandro Souza',
          email: 'leandro@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.16',
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          full_name: 'Juliana Lima',
          email: 'juliana@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.17',
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          full_name: 'Bruno Alves',
          email: 'bruno@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.18',
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          full_name: 'Carolina Silva',
          email: 'carolina@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.19',
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          full_name: 'Vinícius Oliveira',
          email: 'vinicius@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.20',
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          full_name: 'Tatiane Souza',
          email: 'tatiane@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.21',
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          full_name: 'Eduardo Lima',
          email: 'eduardo@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.22',
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          full_name: 'Beatriz Almeida',
          email: 'beatriz@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.23',
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          full_name: 'André Santos',
          email: 'andre@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.24',
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          full_name: 'Fernando Oliveira',
          email: 'fernando@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.25',
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          full_name: 'Luana Silva',
          email: 'luana@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.26',
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          full_name: 'Gabriel Lima',
          email: 'gabriel@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.27',
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          full_name: 'Mariana Alves',
          email: 'mariana.alves@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.28',
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          full_name: 'Rafaela Oliveira',
          email: 'rafaela@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.29',
          created_at: new Date(),
          updated_at: new Date(),
          is_active: true
        },
        {
          full_name: 'Thiago Costa',
          email: 'thiago@gmail.com',
          password: '$2b$10$YlMAihhFSoTgW7/ETak4zuSrkuFmYQM3I5tN0J.30',
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
