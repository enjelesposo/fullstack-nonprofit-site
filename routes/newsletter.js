const router = require('express').Router();
const pool = require('../db');

router.post('/', async (req, res) => {
    try {
        let { first_name, email } = req.body;
        // check if email already exists
        let emailExist = await pool.query('SELECT email FROM newsletter WHERE email = $1', [email]);
        if(emailExist.rows[0]) {
            res.send('Email already exists');
        }
        else {
            let addEmail = await pool.query('INSERT INTO newsletter(first_name, email) VALUES($1, $2)', [first_name, email]);
            res.redirect('newsletter/thanks');
        }
    }
    catch(err) {
        console.log(err);
    }
})

router.get('/thanks', (req, res) => {
    res.render('thanks', { title: "Thank you :)", message: 'Thank you for subscribing to our newsletter!' });
})

module.exports = router;