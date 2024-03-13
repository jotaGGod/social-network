'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
      this.belongsTo(models.Post, {
        foreignKey: 'post_id'
      });
    }
  }
  Comment.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false
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
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Comment',
    tableName: 'comment'
  });
  return Comment;
};