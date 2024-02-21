// Import dependencies
const express = require('express');
const multer = require('multer'); // Untuk file upload
const cors = require('cors'); // Untuk CORS

// Initialize Express app
const app = express();
const port = 3000;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads'); // Set destination folder
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for serving static files
app.use(express.static('public'));

// Middleware for handling CORS
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('Exercise #5 MIDDLEWARE');
});

// Route for file upload
app.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    res.send('File uploaded successfully');
  } else {
    res.send('Error uploading file');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
