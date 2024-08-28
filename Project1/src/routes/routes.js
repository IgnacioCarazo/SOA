const express = require('express');

const router = express.Router();

// POST for recommendations
router.post('/', (req, res) => recommendationController.getRecommendations(req, res));

module.exports = router;
