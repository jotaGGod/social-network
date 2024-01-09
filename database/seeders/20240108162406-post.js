'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('post',
        [
          {
            description: 'Férias em Orlando - Eu com meu mano Mickey',
            user_id: 1,
            target_id: 1,
            type_id: 1,
            created_at: new Date('2022-04-01T08:30:00'),
            updated_at: new Date('2022-04-01T08:32:00'),
            is_active: true
          },
          {
            description: 'Férias em Orlando - Minha mãe passando mal na montanha russa',
            user_id: 1,
            target_id: 1,
            type_id: 1,
            created_at: new Date('2022-12-28T15:45:00'),
            updated_at: new Date('2022-12-28T15:48:00'),
            is_active: true
          },
          {
            description: 'Férias em Orlando - Jacaré invadiu a piscina de casa',
            user_id: 1,
            target_id: 1,
            type_id: 1,
            created_at: new Date('2022-02-12T20:12:00'),
            updated_at: new Date('2022-02-12T20:15:00'),
            is_active: true
          },
          {
            description: 'Férias nas Maldivas - Eu dando mortal',
            user_id: 2,
            target_id: 1,
            type_id: 2,
            created_at: new Date('2022-03-05T12:00:00'),
            updated_at: new Date('2022-03-05T12:05:00'),
            is_active: true
          },
          {
            description: 'Férias nas Maldivas - Olha essa água',
            user_id: 2,
            target_id: 1,
            type_id: 2,
            created_at: new Date('2022-01-04T09:30:00'),
            updated_at: new Date('2022-01-04T09:35:00'),
            is_active: true
          },
          {
            description: 'Férias nas Maldivas - Treino e dieta nas maldivas',
            user_id: 2,
            target_id: 1,
            type_id: 2,
            created_at: new Date('2022-08-03T18:20:00'),
            updated_at: new Date('2022-08-03T18:25:00'),
            is_active: true
          },
          {
            description: 'Aniversário de 40 anos - Bolo da Sodiê',
            user_id: 3,
            target_id: 2,
            type_id: 1,
            created_at: new Date('2023-09-28T22:00:00'),
            updated_at: new Date('2023-09-28T22:05:00'),
            is_active: true
          },
          {
            description: 'Aniversário de 40 anos - Eu e meu primo rico',
            user_id: 3,
            target_id: 2,
            type_id: 1,
            created_at: new Date('2023-11-28T21:45:00'),
            updated_at: new Date('2023-11-28T21:50:00'),
            is_active: true
          },
          {
            description: 'Aniversário da irmãzinha - Amanhã começo a dieta',
            user_id: 4,
            target_id: 1,
            type_id: 4,
            created_at: new Date('2018-02-27T15:30:00'),
            updated_at: new Date('2018-02-27T15:35:00'),
            is_active: true
          },
          {
            description: 'Ubatubão - Praia das toninhas nunca mais',
            user_id: 5,
            target_id: 1,
            type_id: 2,
            created_at: new Date('2014-02-25T14:20:00'),
            updated_at: new Date('2014-02-25T14:25:00'),
            is_active: true
          },
          {
            description: 'Meu job - Como editar foto',
            user_id: 6,
            target_id: 1,
            type_id: 4,
            created_at: new Date('2022-03-01T09:45:00'),
            updated_at: new Date('2022-03-01T09:50:00'),
            is_active: true
          },
          {
            description: 'Casa nova - Sonho realizado',
            user_id: 7,
            target_id: 2,
            type_id: 1,
            created_at: new Date('2014-02-26T12:30:00'),
            updated_at: new Date('2014-02-26T12:35:00'),
            is_active: true
          },
          {
            description: 'Formatura - Enfim formado',
            user_id: 8,
            target_id: 1,
            type_id: 4,
            created_at: new Date('2017-03-02T16:15:00'),
            updated_at: new Date('2017-03-02T16:20:00'),
            is_active: true
          },
          {
            description: 'Grupo de estudos - Esse ano o concurso chega',
            user_id: 9,
            target_id: 2,
            type_id: 1,
            created_at: new Date('2019-02-28T08:00:00'),
            updated_at: new Date('2019-02-28T08:05:00'),
            is_active: true
          },
          {
            description: 'Cabana no Alaska - Construí uma cabana no Alaska',
            user_id: 10,
            target_id: 4,
            type_id: 2,
            created_at: new Date('2002-02-25T19:40:00'),
            updated_at: new Date('2002-02-25T19:45:00'),
            is_active: true
          }
        ]
    );
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('post', null, {});
  }
};
