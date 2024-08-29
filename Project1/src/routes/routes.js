const express = require('express');
const router = express.Router();
const { recommendationController } = require('../controllers');

router.post('/', (req, res) => recommendationController.getRecommendations(req, res));

module.exports = router;
