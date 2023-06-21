const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorhandler');

// create user
exports.registerUser = catchAsyncErrors(async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password
    });
    res.status(201).json({
        success:true,
        user
    })
});

// get all user data
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    });
})

// get single user data
exports.getUserDetails = catchAsyncErrors(async (req, res) => {
    const user = await User.findById(req.params.id);
    res.status(200).json({
        success: true,
        user
    });
});

// update user profile
exports.updateUser = catchAsyncErrors(async(req,res,next)=>{
    let user = await User.findById(req.params.id);
    console.log(user)

    if (!user) {
        return next(new ErrorHandler('user not Found', 404))
    }

    restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: true
    });

    res.status(200).json({
        success: true,
        user
    });
})

// delete user
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        return next(new ErrorHandler('user not Found', 404))
    }

    res.status(200).json({
        success: true,
        message: 'User removed successfully'
    });
});

// login user
exports.loginUser = catchAsyncErrors(async(req,res,next) => {
    const { email, password} = req.body;

    if(!email||!password){
        return next(new ErrorHandler('Please enter email or password', 400));
    }

    const user = await User.findOne({email});
    if(!email||!password){
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    res.status(200).json({
        success: true,
        message: 'Login successfully'
    });
})