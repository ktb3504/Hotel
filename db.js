const mongoose = require('mongoose');
require('dotenv').config();
// const mongoURL = 'process.env.MONGO_URL_LOCAL';
const mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected', () => console.log('Connected to MongoDB'));
db.on('error', (err) => console.log("error message :", err));
db.on('disconnected' ,() => console.log('Disconnected from MongoDB'));

module.exports = db;

