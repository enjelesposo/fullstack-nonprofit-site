// import dependencies
const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv').config();
var bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

// Import Routes
const homeRoute = require('./routes/home');
const donateRoute = require('./routes/donate');
const galleryRoute = require('./routes/gallery');
const contactRoute = require('./routes/contact');
const newsletterRoute = require('./routes/newsletter');

// set view engine
app.set('view engine', 'ejs');

// Make files on 'public' folder public
app.use(express.static('public'));

// middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));


// ROUTE: home page
app.use('/', homeRoute);

// ROUTE: donations page
app.use('/donate', donateRoute);

// ROUTE: gallery page
app.use('/gallery', galleryRoute);

// ROUTE: contacts page
app.use('/contact', contactRoute);

// ROUTE: newsletter (POST)
app.use('/newsletter', newsletterRoute);

// ROUTE: 404
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})

// listen to port 3000 for request
app.listen(PORT);