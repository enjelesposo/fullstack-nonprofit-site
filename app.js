// import dependencies
const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv').config();
var bodyParser = require('body-parser');

// register view engine
app.set('view engine', 'ejs');
// Make files on 'public' folder public
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Import Routes
const homeRoute = require('./routes/home');
const userRoute = require('./routes/user');
const donateRoute = require('./routes/donate');
const galleryRoute = require('./routes/gallery');
const contactRoute = require('./routes/contact');

// middleware
app.use(morgan('dev'));


// ROUTE: home page
app.use('/', homeRoute);

// ROUTE: login and registration page
app.use('/user', userRoute);

// ROUTE: donations page
app.use('/donate', donateRoute);

// ROUTE: gallery page
app.use('/gallery', galleryRoute);

// ROUTE: contacts page
app.use('/contact', contactRoute);

// ROUTE: 404
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})

// listen to port 3000 for request
app.listen(3000);