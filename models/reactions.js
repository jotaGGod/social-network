const Sequelize = require("sequelize");
const db = require('./db');

const Users = require('../models/users');
const Post = require('../models/post.js');
const Reactions_type = require('../models/reactions_type.js');
const {DataTypes} = require("sequelize");

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
    tableName: 'reactions'
});

module.exports = Reactions;
