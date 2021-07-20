const router = require('express').Router();
const fs = require('fs');

router.get('/', (req, res) => {
    fs.readFile('./fixtures/packages.json', 'utf8',(error, data) => {
        res.render('donate', {title: 'Donate today', packages: JSON.parse(data)});
    })
})

router.get('/thanks', (req, res) => {
    res.render('thanks', { title: "Thank you :)", message: 'Thank you for donating!' });
})

module.exports = router;