const Sequelize = require("sequelize");
const db = require('./db');

const Users = require('../models/users');
const Post = require('../models/post.js');
const Reactions_type = require('../models/reactions_type.js');

const Reactions = db.define("reactions", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: Users,
            key: 'id'
        }
    },    
    reactions_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references:{
            model: Reactions_type,
            key: 'id'
        }     
    },
    post_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: Post,
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
    tableName: 'reactions'
});

// Reactions.sync(); //a função sync() cria a tabela no banco de dados caso nao esteja criada

module.exports = Reactions;
