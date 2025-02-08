const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(express.json());

// Single database connection
const db = new sqlite3.Database('users.db', (err) => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE
    )`);
});

// Simple user registration with a single database
app.post('/register', (req, res) => {
    const { name, email } = req.body;

    db.run('INSERT INTO users (name, email) VALUES (?, ?)', 
        [name, email], 
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Registration failed' });
            }
            res.json({ 
                message: 'User registered successfully',
                id: this.lastID
            });
        }
    );
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});