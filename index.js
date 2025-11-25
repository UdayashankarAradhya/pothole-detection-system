const express = require('express');
const db = require('./db'); // Imports your database connection
const app = express();
const port = 3000;

// 1. Middleware: Allows us to read JSON data from ESP32
app.use(express.json());

// 2. Serve the Website: Tells the server to show the "public" folder
app.use(express.static('public'));

// --- API ROUTE 1: RECEIVE DATA (From ESP32) ---
app.post('/api/pothole', (req, res) => {
    const { lat, lng, z_accel, distance } = req.body;

    console.log(`⚠️ DATA RECEIVED: Lat:${lat}, Lng:${lng}, Z:${z_accel}, Dist:${distance}`);

    const sql = `INSERT INTO potholes (lat, lng, z_accel, distance_cm) VALUES (?, ?, ?, ?)`;
    db.query(sql, [lat, lng, z_accel, distance], (err, result) => {
        if (err) {
            console.error('❌ Database Error:', err);
            res.status(500).send('Error saving data');
        } else {
            console.log('✅ Saved to MySQL!');
            res.status(200).send('Data Saved');
        }
    });
});

// --- API ROUTE 2: SEND DATA (To Website) ---
app.get('/api/getpotholes', (req, res) => {
    // Get the latest 50 potholes
    const sql = 'SELECT * FROM potholes ORDER BY timestamp DESC LIMIT 50';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send('Database Error');
        } else {
            res.json(results);
        }
    });
});

// Start the Server
app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});