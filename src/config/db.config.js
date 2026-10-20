const mongoose = require('mongoose');
const dotenv = require('dotenv');
const mongo_url = process.env.MONGO_URL ;

mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
})

module.exports = async function connectDB() {
    await mongoose.connect(mongo_url);
    console.log(`MongoDB connected: ${mongoose.connection.host}`);
}