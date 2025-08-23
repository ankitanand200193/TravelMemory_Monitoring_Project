const mongoose = require('mongoose');
require('dotenv').config();  // Add this line at the top

const URL = process.env.MONGO_URI;
console.log('MongoDB URI:', URL); // Add this for debugging

mongoose.connect(URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB ERROR: '));

module.exports = {db, mongoose};
