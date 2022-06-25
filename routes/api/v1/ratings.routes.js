const express = require('express');
const router = express.Router();
const { getRating, createRating, updateRating, getRatings } = require('../../../controllers/ratings.controller.js') 
const authorization = require('../../../middlewares/auth')

//getRating from restaurant :id
router.get('/:id', getRating);

router.post('/', createRating);

router.put('/', updateRating);

router.get('/:id/all', getRatings);

module.exports = router;