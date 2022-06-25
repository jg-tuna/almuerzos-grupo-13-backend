const db = require("../models");
const { Review, User, Rating } = db;
const {
  errorHandler,
  notFoundError,
} = require("../middlewares/errors/errorHandler.js");

const getReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findOne({
      where: {
        id,
      },
    });
    if (!review) {
      return res.status(404).json({ message: "Restaurant does not exist" });
    }
    res.json(review);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getReviews = async (req, res) => {
  try{
    const {id} = req.params;
    const reviews = await Review.findAll({
      where: {
        RestaurantId: id
      },
      include: [User, Rating]
    })
    res.json(reviews);
  }catch (errors) {
    return res.status(500).json({message: error.message});
  }
}


const createReview = async (req, res) => {
  const { content, UserId, RestaurantId, RatingId } = req.body;
  try {
    const newReview = await Review.create({
      content,
      UserId,
      RestaurantId,
      RatingId
    });
    res.json(newReview);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateReview = async (req, res) => {
  const { content, UserId, RestaurantId, RatingId } = req.body;
  try {
    const { id } = req.params;
    const review = await Review.findByPk(id);
    review.content = content;
    review.UserId = UserId;
    review.RestaurantId = RestaurantId;
    review.RatingId = RatingId;
    await review.save();
    res.json(review);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    await Review.destroy({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createReview,
  updateReview,
  deleteReview,
  getReview,
  getReviews
};
