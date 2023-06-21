const express = require("express");
const { getAllRestaurants, createRestaurant, getRestaurantDetails, updateRestaurant, deleteRestaurant } = require("../controllers/restaurantController");

const router = express.Router();

router.route('/restaurants').get(getAllRestaurants);
router.route('/restaurant/new').post(createRestaurant);
router.route('/restaurant/:id').get(getRestaurantDetails).put(updateRestaurant).delete(deleteRestaurant);

module.exports = router;