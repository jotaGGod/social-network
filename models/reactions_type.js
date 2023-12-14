const Sequelize = require("sequelize");
const db = require('./db');
const {DataTypes} = require("sequelize");

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
    tableName: 'reactions_type'
});

module.exports = Reactions_type;
