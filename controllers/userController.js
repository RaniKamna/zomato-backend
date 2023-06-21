const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');

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
})