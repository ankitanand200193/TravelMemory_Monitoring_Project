const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
PORT = process.env.PORT;
const conn = require('./conn');
app.use(express.json());
app.use(cors());

const tripRoutes = require('./routes/trip.routes');

// 🔹 Import metrics
const {
  register,
  httpRequestDurationMicroseconds,
  httpRequestCounter
} = require('./metrics');

// Middleware to track metrics
app.use((req, res, next) => {
  const startEpoch = Date.now();

  res.on('finish', () => {
    const durationMs = Date.now() - startEpoch;

    httpRequestDurationMicroseconds.labels(req.method, req.path, res.statusCode).observe(durationMs);
    httpRequestCounter.labels(req.method, req.path, res.statusCode).inc();
  });

  next();
});

// Routes
app.use('/trip', tripRoutes); // http://localhost:3001/trip
app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

// 🔹 Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
