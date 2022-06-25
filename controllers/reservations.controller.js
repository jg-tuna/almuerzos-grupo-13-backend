const db = require('../models');
const { Reservation, User, Food, Restaurant } = db;
const {errorHandler, notFoundError} = require('../middlewares/errors/errorHandler.js')

const createReservation = async (req, res) => {
  try{
    const { RestaurantId, UserId, FoodId  } = req.body;
    const reservation = await Reservation.create({
      RestaurantId,
      UserId,
      FoodId
    })
    res.json(reservation);
  } catch(error) {
      return res.status(500).json({message: error.message})
  }
}

const getReservation = async (req,res) => {
  try{
      const { id } = req.params;
      const reservation = await Reservation.findOne({
          where: {
            id
          }
      })
      if (!reservation){
          return res.status(404).json({message: 'No existe esta reserva'})
      }
      res.json(reservation)
  } catch(error){
      return res.status(500).json({message: error.message})
  }
}

const getReservations = async (req,res) => {
  try {
    const reservations = await Reservation.findAll();
    res.json(reservations);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const updateReservation = async (req, res) => {
  try{
      const { id } = req.params;
      const { ready, accepted } = req.body;
      console.log(req.body)
      const reservation = await Reservation.findByPk(id)
      reservation.ready = ready;
      reservation.accepted = accepted;
      await reservation.save()
      res.json(reservation)
  } catch(error){
      return res.status(500).json({message: error.message})
  }
}

const deleteReservation = async (req, res) => {
  try{
      const { id } = req.params;
      await Reservation.destroy({
          where: {
              id
          }
  })
  res.sendStatus(204)
  } catch(error){
      return res.status(500).json({message: error.message})
  }
}


module.exports = {
  createReservation,
  updateReservation,
  deleteReservation, 
  getReservation,
  getReservations
}