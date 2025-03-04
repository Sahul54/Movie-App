// server/app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');
const { errorHandler } = require('./middlewares/errorMiddleware');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);

// Global error handler
app.use(errorHandler);

module.exports = app;
