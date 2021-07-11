// import dependencies
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const pool = require('./db');

// express app
const app = express();

// listen to port 3000 for request
app.listen(3000);

// register view engine
app.set('view engine', 'ejs');

// make every static file on 'public' folder public
app.use(express.static('public'));

// middleware
app.use(morgan('dev'));


// ROUTES

app.get('/home', (req, res) => {
    res.redirect('/');
})

// render home page
app.get('/', (req, res) => {
    fs.readFile('./fixtures/homeContents.json', 'utf8', (err, data) => {
        res.render('home', { title: "Save The Turtles", contents });
    })

});

// render adoption page
app.get('/adopt', async (req, res) => {
    const turtles = await pool.query("SELECT * FROM adoptable_turtles");
    res.render('adopt', { title: 'Adopt a Sea Turtle', turtles: turtles.rows });
});

// render adoption details
app.get('/adopt/:id', async (req, res) => {
    const { id } = req.params;
    const turtle = await pool.query("SELECT * FROM adoptable_turtles WHERE id=$1", [id]);
    res.render('details', { turtle: turtle.rows[0] });
})

app.get('/gallery', (req, res) => {
    res.render('gallery', { title: 'Gallery' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us' });
});

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})