const express = require("express");
const router = express.Router();
const {
  createReview,
  updateReview,
  deleteReview,
  getReview,
  getReviews
} = require("../../../controllers/reviews.controller.js");

const authorization = require('../../../middlewares/auth')

//getReview
router.get("/:id", getReview)

//createReview
router.post("/", createReview);

//updateReview
router.put("/:id", updateReview);

//deleteReview/id
router.delete("/:id", deleteReview);

router.get("/:id/all", getReviews);


module.exports = router;