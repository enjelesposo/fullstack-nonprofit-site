const router = require('express').Router();
const fs = require('fs');

router.get('/', (req, res) => {
    fs.readFile('./fixtures/packages.json', 'utf8',(error, data) => {
        res.render('donate', {title: 'Donate today', packages: JSON.parse(data)});
    })
})

module.exports = router;