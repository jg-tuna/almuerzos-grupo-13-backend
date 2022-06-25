const express = require('express')
const router = express.Router();//Router: You can think of it as a “mini-application,” capable only of performing middleware and routing functions
const hello = require('./api/v1/hello.routes')
const users = require('./api/v1/users.routes.js')
const restaurants = require('./api/v1/restaurants.routes.js')
const foods = require('./api/v1/foods.routes.js')
const reservations = require('./api/v1/reservations.routes')
const reviews = require('./api/v1/reviews.routes.js')
const ratings = require('./api/v1/ratings.routes.js')


const authorization = require('../middlewares/auth');

router.use('/hello', hello);
router.use('/users', users);
router.use('/restaurants', restaurants);
router.use('/foods', foods);

router.use('/reservations', reservations);

router.use('/reviews', reviews);

router.use('/ratings', ratings);



module.exports = router