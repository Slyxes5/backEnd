// app.js
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const users = require('./users');

const app = express();
const port = 3000;

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors({origin: 'http://127.0.0.1:5500'}));
app.use(express.static('public'));

// Setup storage for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads'); // Set destination folder
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Routes
// GET: /users
app.get('/users', (req, res) => {
  res.json(users);
});

// GET: /users/:name
app.get('/users/:name', (req, res) => {
  const userName = req.params.name.toLowerCase();
  const user = users.find(u => u.name.toLowerCase() === userName);
  if (!user) {
    return res.status(404).json({status: "error", message: "Data user tidak ditemukan"});
  }
  res.json(user);
});

// POST: /users
app.post('/users', (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) {
    return res.status(400).json({
      status: 'error',
      message: 'Id and name are required'
    });
  }
  const newUser = {
    id,
    name
  };
  users.push(newUser);

  res.status(201).json({
    status: 'success',
    data: newUser
  });
});


// POST: /upload
app.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    res.send('File uploaded successfully');
  } else {
    res.send('Error uploading file');
  }
});

app.put('/users/:name', (req, res) => {
  const { name } = req.params;
  const { newName } = req.body;
  if (!newName) {
    return res.status(400).json({ status: "error", message: "Masukan data yang akan di input" });
  }
  const userIndex = users.findIndex(u => u.name.toLowerCase() === name.toLowerCase());
  if (userIndex === -1) {
    return res.status(404).json({ status: "error", message: "Data user tidak ditemukan" });
  }
  users[userIndex].name = newName;
  res.json(users[userIndex]);
});

app.delete('/users/:name', (req, res) => {
  const { name } = req.params;
  const index = users.findIndex(u => u.name.toLowerCase() === name.toLowerCase());
  if (index === -1) {
    return res.status(404).json({ status: "error", message: "Data user tidak ditemukan" });
  }
  users.splice(index, 1);
  res.status(204).json({ status: "success", message: "Data user berhasil dihapus" });
});


// 404 Route
app.use((req, res) => {
  res.status(404).json({status: "error", message: "resource tidak ditemukan"});
});

// Error handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({status: "error", message: "terjadi kesalahan pada server"});
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
