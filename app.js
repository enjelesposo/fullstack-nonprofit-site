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
const shopRoute = require('./routes/shop');


// middleware
app.use(morgan('dev'));


// ROUTES: home page
app.use('/', homeRoute);

// ROUTES: adoption page
app.use('/shop', shopRoute);

// ROUTES: login and registration page
app.use('/user', userRoute);

// render gallery
app.get('/gallery', (req, res) => {
    res.render('gallery', { title: 'Gallery' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us' });
});

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})


// listen to port 3000 for request
app.listen(3000);