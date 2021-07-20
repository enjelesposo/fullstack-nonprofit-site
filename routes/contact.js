const router = require('express').Router();

const sendEmail = require('../constants/sendEmail');

router.get('/', (req, res) => {
    res.render('contact', { title: 'Contact Us' });
});

router.get('/thanks', (req, res) => {
    res.render('thanks', { title: "Thank you :)", message: 'Thank you for messaging us!' });
})

router.post('/send', (req, res) => {
    const {name, email, subject, message} = req.body;
    const content = `From: ${name} <${email}>\nSubject: ${subject}\nMessage:\n\t${message}`
    
    sendEmail(name, email, subject, content)
    .then( result => {
        console.log('Email sent!');
        res.redirect('/contact/thanks');
    })
});

module.exports = router;