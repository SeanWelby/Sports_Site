const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: 'root',
    database: 'sportsdb'
});

db.connect(err => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected to database');
});

app.get('/api/players', (req, res) => {
    db.query('SELECT * FROM players', (err, results) => {
        if (err) {
            res.status(500).send('Database error');
            return;
        }
        res.json(results);
    });
});

app.get('/api/blog-posts', (req, res) => {
    const blogPosts = [
        { title: "Big Win for the Knicks", content: "The Knicks won their latest game...", videoUrl: "https://youtube.com" },
        { title: "The Mets' Big Game", content: "The Mets had an exciting game...", videoUrl: "https://youtube.com" }
    ];
    res.json(blogPosts);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
