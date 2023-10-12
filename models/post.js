const Sequelize = require("sequelize");
const db = require('./db');

const Target_public = require("../models/target_public");
const Users = require("../models/users");
const File_type = require("../models/file_type");

const Post = db.define("post", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        }
    },    
    target_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: Target_public,
            key: 'id'
        }             
    },
    file_type_id: {
        type: Sequelize.INTEGER,
        references:{
            model: File_type,
            key: 'id'
        }
    },
    description:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: true
    }
}, {
    timestamps: true,
    tableName: 'post'
});

// Post.sync(); //a função sync() cria a tabela no banco de dados caso nao esteja criada

module.exports = Post;
