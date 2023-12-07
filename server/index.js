const keys = require("./keys");

// Express Application setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: keys.dbConfig.host,
  user: keys.dbConfig.user,
  password: keys.dbConfig.password,
  database: keys.dbConfig.database,
  port: keys.dbConfig.port
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
    createValuesTable(); // Check and create table if necessary
  }
});

// Function to check and create the 'values' table
const createValuesTable = () => {
  const createTableSQL = `
  CREATE TABLE IF NOT EXISTS numbers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    number INT
  )
  
  `;

  db.query(createTableSQL, (err) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Table "numbers" created or already exists');
    }
  });
};

// Express route definitions
app.get("/", (req, res) => {
  res.send("Hi");
});

// Get the values
app.get("/values/all", (req, res) => {
  const sql = 'SELECT * FROM numbers';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error retrieving values:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).json(result);
    }
  });
});

// Now the post -> insert value
app.post("/values", (req, res) => {
  const { value } = req.body;

  if (!value) {
    res.send({ working: false });
    return;
  }

  const sql = 'INSERT INTO numbers (number) VALUES (?)';
  db.query(sql, [value], (err, result) => {
    if (err) {
      console.error('Error inserting value:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send({ working: true });
    }
  });
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
