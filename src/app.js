const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan');

const dbConf = require('./config/DbConfig');
const UserRoute = require('./routes/UserRoute');

// Initializing the express app
app = express();

// Middlewares

// For logging
app.use(morgan('dev'));

// parse json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// For serving static files
app.use(express.static('public'));


// Connect to database
mongoose.connect(`mongodb://${dbConf.username}:${dbConf.password}@${dbConf.host}:${dbConf.port}/${dbConf.database}`, (err) => {
    if(err) {
        console.error(`Error occured while connecting to database : ${err}`);
    } else {
        console.log('Connected to database.');
    }
});

// For serving the routes
app.use('/users', UserRoute);

// THE 404 handler
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Not found'
    });
});

// THE 500 handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: err
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));