'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TargetPublic extends Model {
    static associate(models) {
    }
  }
  TargetPublic.init({
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
    modelName: 'TargetPublic',
    tableName: 'target_public'
  });
  return TargetPublic;
};