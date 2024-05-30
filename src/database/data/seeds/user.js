exports.seed = function(knex) {
  return knex('user').del()
      .then(function () {
        // Inserts seed entries
        return knex('user').insert([
          {
            full_name: 'Jackson Santana',
            email: 'jackson@gmail.com',
            password: '$2b$10$fa.ReNneiZ0Dt.FUJPZcQuX/tqHD4oo77Xdza.B4fhKAmBRZYB78W',
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
          // adicione os demais registros aqui
        ]);
      });
};
