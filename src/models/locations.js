

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Locations extends Model {
    static associate(models) {
      Locations.belongsToMany(models.Plans, {
        through: 'PlanLocations',
        foreignKey: 'locationId',
        otherKey: 'planId',
      });
    }
  }
  Locations.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      category: DataTypes.STRING,
      latitude: DataTypes.FLOAT,
      longitude: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'Locations',
    }
  );
  return Locations;
};