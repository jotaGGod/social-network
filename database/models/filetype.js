'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FileType extends Model {
    static associate(models) {
    }
  }
  FileType.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING
    },
    is_active: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'FileType',
    tableName: 'file_type'
  });
  return FileType;
};