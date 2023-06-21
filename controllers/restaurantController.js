const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Restaurant = require('../models/restaurantsModel');
const ErrorHandler = require('../utils/errorhandler');

// create Restaurant
exports.createRestaurant = catchAsyncErrors(async (req, res, next) => {
    const restaurant = await Restaurant.create(req.body);
    res.status(201).json({
        success: true,
        restaurant,
    })
});

// get all Restaurants
exports.getAllRestaurants = catchAsyncErrors(async (req, res, next) => {
    const restaurant = await Restaurant.find();
    res.status(200).json({
        success: true,
        restaurant
    });
});

// get single restaurant detail
exports.getRestaurantDetails = catchAsyncErrors(async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
        return next(new ErrorHandler('Restaurant not Found', 404))
    }

    res.status(200).json({
        success: true,
        restaurant
    });
});

// update Restaurant
exports.updateRestaurant = catchAsyncErrors(async (req, res, next) => {
    let restaurant = await Restaurant.findById(req.params.id);
    console.log(restaurant)

    if (!restaurant) {
        return next(new ErrorHandler('Restaurant not Found', 404))
    }

    restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: true
    });

    res.status(200).json({
        success: true,
        restaurant
    });
});

// Delete Restaurant
exports.deleteRestaurant = catchAsyncErrors(async (req, res, next) => {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) {
        return next(new ErrorHandler('Restaurant not Found', 404))
    }
    //await restaurant.remove();

    res.status(200).json({
        success: true,
        message: 'Restaurant removed successfully'
    });
});

// create new review or update the review
exports.createRestaurantReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, restaurantId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    };

    const restaurant = await Restaurant.findById(restaurantId);

    const isReviewed = restaurant.reviews.find(
        (rev) => rev.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        restaurant.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating), (rev.comment = comment);
        })
    } else {
        restaurant.reviews.push(review);
        restaurant.numOfReviews = restaurant.reviews.length;
    }

    let ang = 0;
    restaurant.reviews.forEach((rev) => {
        avg += rev.rating;
    })

    restaurant.ratings = avg / restaurant.reviews.length;

    await restaurant.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        restaurant
    });
});

// get all reviews of a restaurant
exports.getRestaurantReview = catchAsyncErrors(async (req, res, next) => {
    const restaurant = await Restaurant.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: restaurant.reviews
    });
})