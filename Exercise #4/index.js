// server.js (or you may use index.js)
const express = require('express');
const morgan = require('morgan');
const users = require('./users');

const app = express();
const port = 3000;

// Middleware for logging
app.use(morgan('dev'));

// GET: /users - List all users
app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:name', (req, res) => {
    const name = req.params.name.toLowerCase();
    const user = users.find(u => u.name.toLowerCase() === name);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "Data user tidak ditemukan" });
    }
  });
  

// Middleware for 404 - Not Found
app.use((req, res, next) => {
  res.status(404).json({ status: "error", message: "resource tidak ditemukan" });
});

// Middleware for Error Handling
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ status: "error", message: "terjadi kesalahan pada server" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
