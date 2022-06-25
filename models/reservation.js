'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Restaurant, {foreignKey: {name : 'RestaurantId'}});
      this.belongsTo(models.User, {foreignKey: {name : 'UserId'}});
      this.belongsTo(models.Food, {foreignKey: {name : 'FoodId'}});
    }
  }
  Reservation.init({
    accepted: DataTypes.BOOLEAN,
    ready: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Reservation',
  });
  return Reservation;
};