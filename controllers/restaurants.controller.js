
const db = require("../models");
const { Op } = require("sequelize")
const { Restaurant, User, Reservation } = db;
const {Food} = db;
const {
  errorHandler,
  notFoundError,
} = require("../middlewares/errors/errorHandler.js");


const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findOne({
      where: {
        id,
      },
    });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant does not exist" });
    }
    res.json(restaurant);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createRestaurant = async (req, res) => {
  const { name, category, details, location, contact, UserId } = req.body;
  try {
    const newRestaurant = await Restaurant.create({
      name,
      category,
      details,
      location,
      contact,
      UserId,
    });
    res.json(newRestaurant);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, details, location, contact, UserId } = req.body;
    const restaurant = await Restaurant.findByPk(id);
    restaurant.name = name;
    restaurant.category = category;
    restaurant.details = details;
    restaurant.location = location;
    restaurant.contact = contact;
    restaurant.UserId = UserId;
    await restaurant.save();
    res.json(restaurant);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    await Restaurant.destroy({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getFoods = async (req,res) => {
    try{
        // recibe id del restaurante
        const {id} = req.params;
        const food = await Food.findAll({
            where: {
                'RestaurantId': id
            }
        })
        if (!food){
            return res.status(404).json({message: 'No food to return'})
        }
        res.json(food)
    }catch (error){
        return res.status(500).json({message: error.message})
    }
}

const getReservations = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findAll({
      where: {
        RestaurantId: id,        
        [Op.or]: [
          {accepted: null}, {accepted: true}
        ],
        ready: false,
        createdAt: {
          [Op.gt]: new Date().setHours(0,0,0,0),
          [Op.lt]: new Date()
        }
      },
      include: [User, Food]
    })
    if(!reservation)
      return res.status(404).json({message: 'No reservations to return'})
    
    res.json(reservation)
  } catch(error){
    return res.status(500).json({message: error.message})
  }
}

const addFavorite = async (req, res) => {
    try{
        const {id} = req.params;//id de restaurante
        console.log(id);
        const {UserId} = req.body;//aca implementar jwt
        console.log(req.body);
        console.log(UserId);
        const user = await User.findOne({
            where:{
                id: UserId
            }
        })
        const restaurant = await Restaurant.findByPk(id)
        // const restaurant = await Restaurant.findOne({
        //     where: {
        //         id: id
        //     }
        // })
        await user.addPlaces(restaurant);
        return res.status(200).json({message: 'favorito'});

    }catch(error){
        console.log(error.message);
        return res.status(500).json({message: error.message})
    }
}

const deleteFavorite = async (req, res) => {
  try{
      const {id} = req.params;//id de restaurante
      console.log(id);
      const {UserId} = req.body;//aca implementar jwt
      console.log(req.body);
      console.log(UserId);
      const user = await User.findOne({
          where:{
              id: UserId
          }
      })
      const restaurant = await Restaurant.findByPk(id)
      // const restaurant = await Restaurant.findOne({
      //     where: {
      //         id: id
      //     }
      // })
      await user.removePlaces(restaurant);
      return res.status(200).json({message: 'removed favorite'});

  }catch(error){
      console.log(error.message);
      return res.status(500).json({message: error.message})
  }
}

module.exports = {

  getRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestaurant,
  addFavorite,
  getFoods,
  getReservations,
  deleteFavorite
};

