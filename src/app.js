const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
const dbConf = require('./config/DbConfig');

const weatherRoute = require('./routes/weather');
const CommonRoute = require('./routes/view/CommonRoute');
const UserRoute = require('./routes/api/UserRoute');
const UserViewRoute = require('./routes/view/UserRoute');

app = express();

// Middlewares

// For logging
app.use((req, res, next) => {
    console.log(`${new Date().toString()} : ${req.method} - ${req.originalUrl}`);
    next();
});

// parse json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// For serving static files
app.use(express.static('public'));

// Expression session middleware
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
//   cookie: { secure: true }
}));

// Express messages middleware
app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Setting ejs view engine
app.set('view engine', 'ejs');

// Connect to database
mongoose.connect(`mongodb://${dbConf.username}:${dbConf.password}@${dbConf.host}:${dbConf.port}/${dbConf.database}`, (err) => {
    if(err) {
        console.error(`Error occured while connecting to database : ${err}`);
    } else {
        console.log('Connected to database.');
    }
});

// For serving the routes
app.use(weatherRoute);
app.use('/', CommonRoute);
app.use('/api/users', UserRoute);
app.use('/users', UserViewRoute);

// THE 404 handler
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "../public/404.html"));
});

// THE 500 handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.sendFile(path.join(__dirname, "../public/500.html"))
});

const PORT = process.env.PORT || 3000;

app.get('/hello', (req, res) => res.send('Hello World!!!'));

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));