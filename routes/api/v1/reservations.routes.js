const express = require('express');
const router = express.Router();
const { createReservation,
  updateReservation,
  deleteReservation, 
  getReservation, getReservations } = require('../../../controllers/reservations.controller.js') 
const authorization = require('../../../middlewares/auth')

//getReservation
router.get('/:id', authorization, getReservation)

router.get('/', authorization, getReservations)

//createReservation
router.post('/', authorization, createReservation)

//updateReservation
router.put('/:id', authorization, updateReservation)

//deleteReservation
router.delete('/:id', authorization, deleteReservation)

module.exports = router;