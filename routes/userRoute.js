const express = require('express');
const { registerUser, getUserDetails, getAllUsers } = require('../controllers/userController');

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/user/:id').get(getUserDetails);
router.route('/users').get(getAllUsers);

module.exports = router;