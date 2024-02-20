const express = require('express');
const morgan = require('morgan');
const moment = require('moment');

const members = require('./members');
const users = require('./users');

const app = express();
const port = 3000;
const hostname = '127.0.0.1';

// Use Morgan as a logger
app.use(morgan('combined'));

// Home route
app.get('/', (req, res) => {
    res.send(`This is the home page \n${moment().format('MMMM Do YYYY, h:mm:ss a')}`);
});

// About route
app.get('/about', (req, res) => {
    res.json({
        'status': 'success',
        'message': 'response success',
        'description': 'Exercise #3',
        'members': members
    });
});

// Users route
app.get('/users', (req, res) => {
    res.json({ 'users': users });
});

// Start the server
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
