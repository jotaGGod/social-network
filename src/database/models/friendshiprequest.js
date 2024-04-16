'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class friendshipRequest extends Model {
    static associate(models) {
        this.belongsTo(models.User, {
            foreignKey: "sender_id"
        });
        this.belongsTo(models.User, {
            foreignKey: "receiver_id"
        });
        this.belongsTo(models.FriendshipRequestType, {
            foreignKey: "request_type_id"
        });
    }
  }
  friendshipRequest.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    request_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    }
  }, {
    sequelize,
    tableName: 'friendship_request',
    modelName: 'friendshipRequest',
  });
  return friendshipRequest;
};