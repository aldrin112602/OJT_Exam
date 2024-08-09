const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Authentication endpoints
router.post('/login', authController.login);
router.get('/user', authController.getUser);

module.exports = router;
