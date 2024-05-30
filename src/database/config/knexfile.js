require('dotenv').config();

module.exports = {
    development: {
        client: 'mysql2',
        connection: "mysql://root:1234@localhost:3306/social_network",
        searchPath: ['knex', 'public'],
        migrations: {
            directory: '../data/migrations',
        },
        seeds: {
            directory: '../data/seeds',
        }
    },
    test: {
        client: 'mysql2',
        connection: "mysql://root:1234@localhost:3306/social_network",
        searchPath: ['knex', 'public'],
        migrations: {
            directory: './src/database/migrations',
        },
        seeds: {
            directory: './src/database/seeds',
        }
    }    
};
