const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('contact', { title: 'Contact Us' });
});

module.exports = router;