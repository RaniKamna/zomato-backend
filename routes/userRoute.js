const express = require('express');
const { registerUser, getUserDetails, getAllUsers, deleteUser, updateUser, loginUser } = require('../controllers/userController');
const { authorizedRoles } = require('../middleware/auth');

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/user/:id').get(getUserDetails).delete(authorizedRoles("admin"),deleteUser).put(authorizedRoles("admin"),updateUser);
router.route('/users').get(getAllUsers);
router.route('/login').post(loginUser);

module.exports = router;