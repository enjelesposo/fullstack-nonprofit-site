const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');

const { registerValidation, loginValidation } = require('../validation');

router.get("/login", (req, res) => {
    res.render('login', { title: "Log in or Sign Up" });
})

router.get("/register", (req, res) => {
    res.render('register', { title: "Log in or Sign Up" });
})

// user authentication

router.post('/register', async (req, res) => {
    // validate input
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try {
        const {name, email, password} = req.body;

        // check if user is already registered
        const emailExists = await pool.query('SELECT email FROM users WHERE email=$1', [email]);
        if(emailExists.rows[0]) return res.status(400).send('Email already exists');

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query('INSERT INTO users(name, email, password)VALUES($1, $2, $3)', [name, email, hashPassword]);
        res.redirect('/user/login');
    }
    catch(err) {
        console.error(err);
    }
})


module.exports = router;