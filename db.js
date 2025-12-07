// db.js - Database Connection
const mysql = require('mysql2');

// Create the connection settings
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Uday@mysql05', // <--- PUT YOUR MYSQL PASSWORD HERE
  database: 'pothole_db'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to MySQL:', err);
    return;
  }
  console.log('✅ Connected to MySQL Database!');
});

module.exports = connection;