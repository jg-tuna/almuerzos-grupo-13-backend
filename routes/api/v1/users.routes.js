const express = require('express');
const router = express.Router();

const authorization = require('../../../middlewares/auth');
const adminAuth = require('../../../middlewares/adminAuth');
const userChangesAuth = require('../../../middlewares/userChangesAuth');

const { getUsers, createUser, updateUser, deleteUser, getUser, loginUser, getFavorites, getReservations } = require('../../../controllers/users.controller.js') 

// Acá van las rutas de los CRUD se Users

// CREATE
router.post('/', createUser)

// READ
router.get('/', [authorization, adminAuth], getUsers)

// UPDATE
router.put('/:id', [authorization, userChangesAuth], updateUser)

// DELETE
router.delete('/:id', [authorization, userChangesAuth], deleteUser)

// SHOW
router.get('/:id', authorization, getUser)


router.get('/:id/favorites', getFavorites)

router.get('/:id/reservations', authorization, getReservations)


// Post para el logeado del usuario.
router.post('/login', loginUser)


module.exports = router;