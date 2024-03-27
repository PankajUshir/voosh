const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

router.post('/login', authController.loginUser);
router.post('/logingithub', authController.loginUserGithub);
router.post('/signup', authController.signUp);
router.post('/logout', authController.logoutUser);

module.exports = router;
