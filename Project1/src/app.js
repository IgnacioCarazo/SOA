const express = require('express');
const dotenv = require('dotenv');
require('dotenv').config();
const recommendationRoutes = require('./routes/routes');

dotenv.config();

const app = express();

app.use(express.json());

// Use the /api prefix for routes
app.use('/api/recommendations', recommendationRoutes);

module.exports = app;
