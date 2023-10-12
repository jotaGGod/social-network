const Sequelize = require("sequelize");
const db = require('./db');

const Target_public = require("./target_public");

const Album = db.define('album', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    target_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Target_public,
            key: 'id'
        }
    }, 
    is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
   }
}, {
    timestamps: false,
    tableName: 'album'
});

// Album.sync(); //a função sync() cria a tabela no banco de dados caso nao esteja criada

module.exports = Album;


// Desabilita ou habilita as colunas createdAt e updatedAt