const db = require('../models');
const {Rating} = db;
const {errorHandler, notFoundError} = require('../middlewares/errors/errorHandler.js')
const jwt = require("jsonwebtoken");
const { secret } = require("../utils/auth");


const getRating = async (req,res) => {
  try{
      const { id } = req.params;
      const RestaurantId = id;
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          // ... si no es válido retorna error 401 señalando que es invalido
          return res.status(401).send({ error: "token invalido" });
        } else {
          // si es válido añade el usuario al req y sigue con next().
          req.user = decoded.user;
        }
      });
      // console.log(RestaurantId);
      const UserId = req.user.id;
      // console.log("getRating userID");
      //console.log(UserId);
      // console.log("getRating restaurantID");
      // console.log(RestaurantId);
      const rating = await Rating.findOne({
          where: {
            "UserId" : UserId,
            "RestaurantId" : RestaurantId
          }
      })
      res.json(rating);
  }catch(error){
      return res.status(500).json({message: error.message})
  }
}

const getRatings = async (req,res) => {
  try{
      const { id } = req.params;
      const RestaurantId = id;
      const ratings = await Rating.findAll({
          where: {
            "RestaurantId" : RestaurantId
          }
      });
      if (!ratings) {
        res.json(0)
      }
    //   const obtainMean = (myArray) => {
    //     var i = 0, summ = 0, ArrayLen = myArray.length;
    //     while (i < ArrayLen) {
    //         summ = summ + myArray.value[i++];
    //   }
    //     return summ / ArrayLen;
    // } 
    //   const mean = obtainMean(ratings);
    //   console.log(mean)
    let suma = 0;

    for(let x = 0; x < ratings.length; x++){
      suma += ratings[x].value;
    }
    let promedio = suma / ratings.length;
      res.json(promedio);
  }catch(error){
      return res.status(500).json({message: error.message})
  }
}

const createRating = async (req, res) => {
  const { value, UserId, RestaurantId } = req.body;
  try {
    const newRating = await Rating.create({
      value,
      UserId,
      RestaurantId
    });
    res.json(newRating);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateRating = async (req, res) => {
  try {
    const { value, UserId, RestaurantId } = req.body;
    const rating = await Rating.findOne({
      where: {
        "UserId" : UserId,
        "RestaurantId" : RestaurantId
      }
    });
    rating.value = value;
    rating.UserId = UserId;
    rating.RestaurantId = RestaurantId;
    await rating.save();
    res.json(rating);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getRating,
  createRating,
  updateRating,
  getRatings
};