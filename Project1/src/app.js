const express = require('express');
const dotenv = require('dotenv');
const recommendationRoutes = require('./routes/recommendationRoutes');

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/recommendations', recommendationRoutes);

module.exports = app;