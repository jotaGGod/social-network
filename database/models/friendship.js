'use strict';
const { User } = require('./user');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friendship extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "principal_user_id"
      });
      this.belongsTo(models.User, {
        foreignKey: "friend_id"
      });
    }
  }
  Friendship.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    principal_user_id: {
      type: DataTypes.INTEGER,
    },
    friend_id: {
      type: DataTypes.INTEGER
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  }, {
    sequelize,
    modelName: 'Friendship',
    tableName: 'friendship'
  });
  return Friendship;
};