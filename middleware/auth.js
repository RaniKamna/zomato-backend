const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsyncErrors = require('./catchAsyncErrors');
const ErrorHandler = require('../utils/errorhandler');

exports.isAuthenticatedUser = catchAsyncErrors(async (req,res,next)=>{
    const token = req.cookies;

    if (!token) {
        return next(new ErrorHandler('Please login to access the resource', 401))
    }

    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodeData.id);
    next();
});

exports.authorizedRoles = (...roles) => {
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(
                new ErrorHandler(
                    `Role: ${req.user.role} is not allowed to access this resource`,
                    403
                )
            )
        }
        next();
    }
}