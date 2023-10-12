const Sequelize = require("sequelize");
const db = require('./db');

const Reactions_type = db.define("reactions_type", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    description:{
        type: Sequelize.STRING
    },   
    is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
   }
}, {
    timestamps: false,
    tableName: 'reactions_type'
});

// Reactions_type.sync(); //a função sync() cria a tabela no banco de dados caso nao esteja criada

module.exports = Reactions_type;
