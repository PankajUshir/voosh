const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/', userController.updateUser);
router.put('/uploadphoto/:id', userController.uploadPhoto);
module.exports = router;
