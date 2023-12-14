const Sequelize = require("sequelize");
const db = require('./db');

const Target_public = require("./target_public");
const {DataTypes} = require("sequelize");

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
    tableName: 'album'
});

module.exports = Album;
