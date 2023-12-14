const Sequelize = require("sequelize");
const db = require('./db');

const Users = require('../models/users');
const Post = require('../models/post.js');
const {DataTypes} = require("sequelize");

const Comments = db.define("comments", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    description: {
        type: Sequelize.STRING
    },    
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,        
        references:{
            model: Users,
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
    created_at: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        allowNull: false
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        allowNull: false
    },
    is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
   }
}, {
    tableName: 'comments'

});

module.exports = Comments;
