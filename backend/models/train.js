const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema({
    name: { type: String, required: true },
    distance: { type: Number, required: true },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
});

const trainSchema = new mongoose.Schema({
    name: { type: String, required: true },
    stops: [stopSchema],
});

const Train = mongoose.model('Train', trainSchema);

module.exports = Train;