'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FriendshipRequestType extends Model {
    static associate(models) {
    }
  }
  FriendshipRequestType.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'friendship_request_type',
    modelName: 'FriendshipRequestType',
  });
  return FriendshipRequestType;
};