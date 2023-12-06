
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const app = express();
const port = 3051;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'nodeuser',
  password: 'Node1234',
  database: 'nodedb',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }
  console.log('Connected to MySQL');
});

// ... rest of your code
