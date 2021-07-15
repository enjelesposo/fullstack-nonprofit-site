const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { registerValidation, loginValidation } = require('../validation');

const verifyToken = require('./verify-token');

router.get('/', verifyToken, (req, res) => {
    res.render('user');
});

router.get('/login', (req, res) => {
    res.render('login', { title: "Log in or Sign Up" });
});

router.get("/register", (req, res) => {
    res.render('register', { title: "Log in or Sign Up" });
});

// user authentication

router.post('/register', async (req, res) => {
    // validate input
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const {name, email, password} = req.body;

    // check if user is already registered
    const emailExists = await pool.query('SELECT email FROM users WHERE email=$1', [email]);
    if(emailExists.rows[0]) return res.status(400).send('Email already exists');

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        const newUser = await pool.query('INSERT INTO users(name, email, password)VALUES($1, $2, $3)', [name, email, hashPassword]);
        res.redirect('/user/login');
    }
    catch(err) {
        console.error(err);
    }
})


// user login 
router.post('/login', async (req, res) => {
    // TODO: VALIDATE USER INPUT
     const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    // TODO: CHECK IF USER EXSISTS
    const user = await pool.query('SELECT * FROM users WHERE email=$1', [req.body.email]);
    const emailExists = user.rows[0].email;
    if(!emailExists) return res.status(400).send('Email not found');
    // TODO: CHECK PASSWORD
    const validPassword = await bcrypt.compare(req.body.password, user.rows[0].password);
    if(!validPassword) return res.status(404).send('Password is incorrect');
    res.send('Welcome!')
    // TODO: CREATE & ASSIGN USER TOKEN
    // const token = jwt.sign({ _id: user.rows[0].id, name: user.rows[0].name }, process.env.TOKEN_KEY);
    // res.header('auth-token', token).redirect('/adopt');
});

module.exports = router;