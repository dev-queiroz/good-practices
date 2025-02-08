const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.json());

// SQLite connection
const sqlDb = new sqlite3.Database('users.db', (err) => {
    if (err) console.error('SQLite connection error:', err);
    sqlDb.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE
    )`);
});

// MongoDB connection
const mongoUrl = 'mongodb://localhost:27017';
let mongoDb;

MongoClient.connect(mongoUrl, (err, client) => {
    if (err) console.error('MongoDB connection error:', err);
    mongoDb = client.db('userdb');
    mongoDb.createCollection('users');
});

// Unnecessarily complex user registration that saves to both databases
app.post('/register', async (req, res) => {
    const { name, email } = req.body;

    try {
        // Save to SQLite
        sqlDb.run('INSERT INTO users (name, email) VALUES (?, ?)', 
            [name, email], 
            async function(err) {
                if (err) {
                    console.error('SQLite error:', err);
                    return res.status(500).json({ error: 'SQLite insertion failed' });
                }

                // Save to MongoDB
                try {
                    await mongoDb.collection('users').insertOne({
                        name,
                        email,
                        sqlId: this.lastID,  // Unnecessarily linking the two databases
                        metadata: {           // Unnecessary additional data
                            createdAt: new Date(),
                            platform: 'web',
                            version: '1.0'
                        }
                    });

                    res.json({ 
                        message: 'User registered in both databases!',
                        sqliteId: this.lastID
                    });
                } catch (mongoErr) {
                    // If MongoDB fails, we should probably rollback the SQLite insertion
                    // (but we won't, making it even more problematic!)
                    console.error('MongoDB error:', mongoErr);
                    res.status(500).json({ error: 'MongoDB insertion failed' });
                }
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('This is an over-engineered example that violates YAGNI principle:');
    console.log('1. Uses two databases when one would suffice');
    console.log('2. Stores unnecessary metadata');
    console.log('3. Creates complex relationships between databases');
    console.log('4. No proper error handling for database rollbacks');
});
