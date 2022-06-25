const express = require("express");
const router = express.Router();
const {
  getRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestaurant,
  getFoods,
  getReservations,
  addFavorite,
  deleteFavorite

} = require("../../../controllers/restaurants.controller.js");

const authorization = require('../../../middlewares/auth')


//Aca van las rutas de los CRUD se Users

//getRestaurants
router.get("/", getRestaurants);

//createRestaurant
router.post("/", authorization, createRestaurant);

//updateRestaurant
router.put("/:id",  authorization, updateRestaurant);

//deleteRestaurant/id
router.delete("/:id", deleteRestaurant);

//getRestaurant/id
router.get("/:id", getRestaurant);

//getFoods
router.get('/:id/foods', getFoods);

// getReservations
router.get('/:id/reservations', authorization, getReservations);

//postRestaurant/id/favorito
router.post('/:id/favorite', authorization, addFavorite)

//postRestaurant/id/favorito
router.delete('/:id/favorite', authorization, deleteFavorite)

module.exports = router;