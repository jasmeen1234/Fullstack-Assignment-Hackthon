const express = require('express');
const mongoose = require('mongoose');
const Train = require('./models/train');
const cors = require('cors');
// Initialize Express app
const app = express();



// Enable CORS for all routes
app.use(cors());
// Configure middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/train_search_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Define routes and handle train search logic

// Route to search trains based on source and destination
app.get('/trains', async (req, res) => {
    const { source, destination } = req.query;

    try {
        const trains = await Train.find({
            $and: [
                { 'stops.name': source },
                { 'stops.name': destination },
            ],
        });

        // Filter and format the train results
        const filteredTrains = trains.map((train) => {
            const sourceStop = train.stops.find((stop) => stop.name === source);
            const destinationStop = train.stops.find((stop) => stop.name === destination);
            const distance = Math.abs(destinationStop.distance - sourceStop.distance);
            const price = distance * 1.25; // Calculate price based on distance

            return {
                name: train.name,
                departureTime: sourceStop.departureTime,
                arrivalTime: destinationStop.arrivalTime,
                distance,
                price,
            };
        });

        res.json(filteredTrains);
    } catch (error) {
        console.error('Error searching trains:', error);
        res.status(500).json({ error: 'An error occurred while searching for trains.' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});


