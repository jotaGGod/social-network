const Sequelize = require("sequelize");
const db = require('./db');

const File_type = db.define('file_type', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },    
    is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
   }
}, {
    timestamps: false,
    tableName: 'file_type'
});

// File_type.sync(); //a função sync() cria a tabela no banco de dados caso nao esteja criada

module.exports = File_type;
