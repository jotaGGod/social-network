const { Sequelize, DataTypes} = require('sequelize');
const db = require('./db');
const Users = require('../models/users');

const Friendship = db.define("friendship", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    principal_user_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        }
    },
    friend_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Users,
            key: 'id'
        }
    },
    is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
   },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        allowNull: false
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        allowNull: false
    }
}, {
    tableName: 'friendship'
});

//Friendship.sync(); //a função sync() cria a tabela no banco de dados caso nao esteja criada

module.exports = Friendship; 
