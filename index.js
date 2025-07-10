const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const db = new sqlite3.Database('./users.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    email TEXT
  )`);
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/signup', (req, res) => {
  const { username, password, email } = req.body;
  db.run(
    `INSERT INTO users (username, password, email) VALUES (?, ?, ?)`,
    [username, password, email],
    function (err) {
      if (err) {
        return res.status(400).json({ error: 'Username already exists' });
      }
      res.json({ id: this.lastID, username, email });
    }
  );
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  db.get(
    `SELECT id, username, email FROM users WHERE username=? AND password=?`,
    [username, password],
    (err, row) => {
      if (row) res.json(row);
      else res.status(401).json({ error: 'Invalid credentials' });
    }
  );
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port', PORT));
