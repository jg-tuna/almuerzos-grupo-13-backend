'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Restaurant, {foreignKey: {name : 'RestaurantId'}});
      this.belongsTo(models.User, {foreignKey: {name : 'UserId'}});
      this.belongsTo(models.Rating, {foreignKey: {name : 'RatingId'}});
    }
  }
  Review.init({
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
