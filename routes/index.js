const express = require('express');
const router = express.Router();
const authRoutes = require('./AuthRoutes');
const { authenticateToken } = require('../middleware/authMiddleware');
const userRoutes = require('./UserRoutes');

router.use('/auth', authenticateToken);
router.use('/auth/users', userRoutes);

router.use('/', authRoutes);

module.exports = router;
