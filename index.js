require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const connectDB = require('./config/db');

// Database connection
connectDB();
app.use(express.static('public'));


app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Routes 
app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
});
