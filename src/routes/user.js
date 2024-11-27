const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.get('/login', userController.login);
router.post('/login', userController.loginProcess);
router.get('/register', userController.register);
router.post('/register', userController.registerProcess);

module.exports = router;