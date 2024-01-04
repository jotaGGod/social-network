'use strict';
const { User } = require('./user');
const { ReactionType } = require('./reactiontype');
const { Post } = require('./post');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Reaction extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
      this.belongsTo(models.ReactionType, {
        foreignKey: 'reaction_type_id'
      });
      this.belongsTo(models.Post, {
        foreignKey: 'post_id'
      });
    }
  }
    Reaction.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
  },
  user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
  },    
  reaction_type_id: {
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
    modelName: 'Reaction',
    tableName: 'reaction'
  });
  return Reaction;
};
