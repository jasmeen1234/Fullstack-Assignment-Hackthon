import React, { useState, useEffect } from 'react';
import './style/TrainSearch.css'; // Import the external CSS file

function TrainSearch() {
    const [stations, setStations] = useState([]);
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [trains, setTrains] = useState([]);
    const [sortedTrains, setSortedTrains] = useState([]);
    const [sortBy, setSortBy] = useState('price');

    // Fetch stations data on component mount
    useEffect(() => {
        fetch('stations')
            .then(response => response.json())
            .then(data => setStations(data))
            .catch(error => console.error('Error fetching stations:', error));
    }, []);

    const handleSourceChange = (event) => {
        setSource(event.target.value);
    };

    const handleDestinationChange = (event) => {
        setDestination(event.target.value);
    };

    const handleSortByChange = (event) => {
        setSortBy(event.target.value);
    };

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:3000/trains?source=${source}&destination=${destination}`);
            const data = await response.json();
            setTrains(data);
        } catch (error) {
            console.error('Error searching trains:', error);
        }
    };

    // Sort trains based on selected sort option
    useEffect(() => {
        const sortTrains = [...trains].sort((a, b) => {
            if (sortBy === 'price') {
                return a.price - b.price;
            } else if (sortBy === 'departureTime') {
                return a.departureTime.localeCompare(b.departureTime);
            } else {
                return a.arrivalTime.localeCompare(b.arrivalTime);
            }
        });
        setSortedTrains(sortTrains);
    }, [trains, sortBy]);

    return (
        <div className="train-search-container">
            <h2>Train Search</h2>
            <div className="form-container" >
                <label htmlFor="source">Source:</label>
                {/* <select id="source" value={source} onChange={handleSourceChange}>
                    <option value="">Select source station</option>
                    {stations.map(station => (
                        <option key={station} value={station}>{station}</option>
                    ))}
                </select> */}
                <input
                    type="text"
                    id="source"
                    value={source}
                    onChange={handleSourceChange}
                />
            </div>
            <div className="form-container">
                <label htmlFor="destination">Destination:</label>
                {/* <select id="destination" value={destination} onChange={handleDestinationChange}>
                    <option value="">Select destination station</option>
                    {stations.map(station => (
                        <option key={station} value={station}>{station}</option>
                    ))}
                </select> */}
                <input
                    type="text"
                    id="destination"
                    value={destination}
                    onChange={handleDestinationChange}
                />
            </div>
            <button className="search-button"  onClick={handleSearch}>Search</button>
            {sortedTrains.length > 0 && (
                <div className="train-results" >
                    <h3>Available Trains:</h3>
                    <div className="sort-container" >
                        <label htmlFor="sort">Sort by:</label>
                        <select id="sort" value={sortBy} onChange={handleSortByChange}>
                            <option value="price">Price</option>
                            <option value="departureTime">Departure Time</option>
                            <option value="arrivalTime">Arrival Time</option>
                        </select>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Train Name</th>
                                <th>Departure Time</th>
                                <th>Arrival Time</th>
                                <th>Distance</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedTrains.map((train, index) => (
                                <tr key={index}>
                                    <td>{train.name}</td>
                                    <td>{train.departureTime}</td>
                                    <td>{train.arrivalTime}</td>
                                    <td>{train.distance}Kms</td>
                                    <td>Rs {train.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default TrainSearch;
