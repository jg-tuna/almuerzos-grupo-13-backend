const db = require('../models');
const {Food} = db;
const {errorHandler, notFoundError} = require('../middlewares/errors/errorHandler.js')

const createFood = async (req, res) => {
  try{
      const {name, description, price, RestaurantId} = req.body;
      const food = await Food.create({
          name,
          description,
          price,
          RestaurantId
      })
      res.json(food)
  } catch (error){
      return res.status(500).json({message: error.message})
  }
}

const getFood = async (req,res) => {
  try{
      const {id} = req.params;
      const food = await Food.findOne({
          where: {
            id
          }
      })
      if (!food){
          return res.status(404).json({message: 'Food does not exist'})
      }
      res.json(food)
  }catch(error){
      return res.status(500).json({message: error.message})
  }
}



const updateFood = async (req, res) => {
  try{
      const {id} = req.params;
      const {name, description, price, RestaurantId} = req.body;
      const food = await Food.findByPk(id)
      food.name = name;
      food.description = description;
      food.price = price;
      food.RestaurantId = RestaurantId;
      await food.save()
      res.json(food)
  }catch(error){
      return res.status(500).json({message: error.message})
  }
}

const deleteFood = async (req, res) => {
  try{
      const {id} = req.params;
      await Food.destroy({
          where: {
              id
          }
  })
  res.sendStatus(204)
  }catch(error){
      return res.status(500).json({message: error.message})
  }
}


module.exports = {
  createFood,
  updateFood,
  deleteFood, 
  getFood
}