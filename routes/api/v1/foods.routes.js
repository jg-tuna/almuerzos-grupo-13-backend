const express = require('express');
const router = express.Router();
const {updateFood, deleteFood, createFood, getFood} = require('../../../controllers/foods.controller.js') 
const authorization = require('../../../middlewares/auth')

//getFood
router.get('/:id', getFood)

//createFood
router.post('/', createFood)

//updateFood
router.put('/:id', updateFood)

//deleteFood/id
router.delete('/:id', deleteFood)

module.exports = router;