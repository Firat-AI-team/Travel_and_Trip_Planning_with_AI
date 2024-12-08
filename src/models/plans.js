'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plans extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Plans.belongsToMany(models.Locations, {
        through: 'PlanLocations',
        foreignKey: 'planId',
        otherKey: 'locationId',
      });
    }
  }
  Plans.init({
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    locations: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Plans',
  });
  return Plans;
};