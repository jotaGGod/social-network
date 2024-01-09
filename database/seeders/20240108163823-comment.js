'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('comment',
        [
          {
            description: "Queriaa estar aí!!",
            user_id: 30,
            post_id: 1,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
          },
          {
            description: "Essa montanha russa é braba",
            user_id: 30,
            post_id: 2,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
          },
          {
            description: "Já teve vários acidentes com jacaré aí",
            user_id: 30,
            post_id: 3,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
          },
          {
            description: "Uma das águas mais lindas do mundo",
            user_id: 29,
            post_id: 5,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
          },
          {
            description: "Foco sempre irmão",
            user_id: 29,
            post_id: 6,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
          },
          {
            description: "O melhor bolo!",
            user_id: 28,
            post_id: 7,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
          },
          {
            description: "Brigadeiro é a melhor coisa",
            user_id: 27,
            post_id: 9,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
          },
          {
            description: "Essa praia é muito suja",
            user_id: 26,
            post_id: 10,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
          },
          {
            description: "Legal essas dicas de foto",
            user_id: 25,
            post_id: 11,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
          },
          {
            description: "Parabéns pela conquista!",
            user_id: 24,
            post_id: 12,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
          },
          {
            description: "Pra cima, você vai conseguir!",
            user_id: 22,
            post_id: 14,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
          },
          {
            description: "Muito aconchegante, top demais",
            user_id: 21,
            post_id: 15,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
          }
        ]
    );
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('comment', null, {});
  }
};
