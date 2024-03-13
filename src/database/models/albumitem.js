'use strict';
const { Post } = require('./post');
const { Album } = require('./album');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AlbumItem extends Model {
    static associate(models) {
      this.belongsTo(models.Post, {
        foreignKey: 'post_id'
      });
      this.belongsTo(models.Album, {
        foreignKey: 'album_id'
      });
    };
  }
  AlbumItem.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    post_id:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    album_id:{
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
    is_active:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'AlbumItem',
    tableName: 'album_item'
  });
  return AlbumItem;
};