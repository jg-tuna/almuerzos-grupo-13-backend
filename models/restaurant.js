'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.User, {foreignKey: {name : 'UserId'}});
      this.belongsToMany(models.User, {as: 'usernames', through: 'Favorites'});
      this.hasMany(models.Food);
      this.hasMany(models.Rating);
      this.hasMany(models.Review);
      this.hasMany(models.Reservation)
    }
  }
  Restaurant.init({
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    details: DataTypes.STRING,
    location: DataTypes.STRING,
    contact: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Restaurant',
  });
  return Restaurant;
};
