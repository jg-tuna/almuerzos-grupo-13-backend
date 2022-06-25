'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Restaurant);
      this.belongsToMany(models.Restaurant, {as: 'places', through: 'Favorites'});
      this.hasMany(models.Rating);
      this.hasMany(models.Review);
      this.hasMany(models.Reservation)
    }
    //Pa conseguir favoritos: await User.findAll({include: 'places'})
    //Pa agregar favs: await userinstance.addPlaces(restaurantinstance)
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
