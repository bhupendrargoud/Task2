const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const app = express();
const port = 3001;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'nodeuser',
  password: 'Node1234',
  database: 'nodedb',
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Registration endpoint
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  db.query(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, hashedPassword],
    (err, results) => {
      if (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(201).json({ message: 'User registered successfully' });
      }
    }
  );
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE username = ?',
    [username],
    (err, results) => {
      if (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else if (results.length > 0) {
        const user = results[0];
        if (bcrypt.compareSync(password, user.password)) {
          res.status(200).json({ message: 'Login successful' });
        } else {
          res.status(401).json({ error: 'Invalid password' });
        }
      } else {
        res.status(401).json({ error: 'User not found' });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
