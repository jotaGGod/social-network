const Sequelize = require("sequelize");
const db = require('./db');

const Post = require("../models/post.js");
const Album = require("../models/album.js");

const Album_item = db.define("album_item", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },    
    post_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Post,
            key: 'id'
        }       
    },
    album_item:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Album,
            key: 'id'
        } 
    },
    is_active:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    timestamps: false,
    tableName: 'album_item'
});

// Album_item.sync(); //a função sync() cria a tabela no banco de dados caso nao esteja criada

module.exports = Album_item;
