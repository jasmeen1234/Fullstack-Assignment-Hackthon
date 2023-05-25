
// / dataGeneration.js

const mongoose = require('mongoose');
const Train = require('./trains');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/train_search_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
        generateTestData();
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Generate random train data
async function generateTestData() {
    try {
        const stations = ['Chennai', 'Vellore', 'Bangalore', 'Mysuru', 'Mangalore', 'Shimoga', 'Delhi', 'Kolkata'];
        const trains = [];

        // Generate 1000 random trains
        for (let i = 1; i <= 1000; i++) {
            const trainName = `Train ${i}`;
            const numStops = Math.floor(Math.random() * 6) + 1; // Random number of stops (1 to 6)
            const stops = [];

            let distance = 0;
            let departureTime = randomTime();
            let arrivalTime = randomTime();

            for (let j = 0; j < numStops; j++) {
                const stop = {
                    name: stations[Math.floor(Math.random() * stations.length)], // Random station
                    distance: distance,
                    departureTime: departureTime,
                    arrivalTime: arrivalTime,
                };

                stops.push(stop);

                distance += Math.floor(Math.random() * 150) + 50; // Random distance (50 to 200 km)
                departureTime = randomTime(); // Random departure time
            }

            const train = {
                name: trainName,
                stops: stops,
            };

            trains.push(train);
        }

        // await Train.deleteMany(); // Clear existing data

        // Insert test data
        await Train.insertMany(trains);

        console.log('Test data generated successfully');
        process.exit(); // Terminate the script
    } catch (error) {
        console.error('Error generating test data:', error);
        process.exit(1); // Terminate the script with an error
    }
}

// Generate random time in HH:MM format
function randomTime() {
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    return `${padZero(hours)}:${padZero(minutes)}`;
}

// Pad a number with leading zero if necessary
function padZero(number) {
    return number.toString().padStart(2, '0');
}
