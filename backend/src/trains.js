// train.js (model file)

const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
    name: String,
    stops: [
        {
            name: String,
            distance: Number,
            departureTime: String,
            arrivalTime: String,
        }
    ],
});

const Train = mongoose.model('Train', trainSchema);

module.exports = Train;