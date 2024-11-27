const express = require('express');

const movieController = require('../controllers/movieController');

const router = express.Router();

router.get('/detail/:id', movieController.detail);

module.exports = router;