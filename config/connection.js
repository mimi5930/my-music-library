const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || process.env.DB_LOCAL);

module.exports = mongoose.connection;
