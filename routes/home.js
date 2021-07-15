const router = require('express').Router();
const fs = require('fs');

router.get('/', (req, res) => {
    res.redirect('/home');
})

// render home page
router.get('/home', (req, res) => {
    fs.readFile('./fixtures/homeContents.json', 'utf8', (err, data) => {
        if(err) {
            console.error(err);
        }
        const content = JSON.parse(data);
        const {cards, articles} = content;
        res.render('home', { title: 'Save the Turtles', cards: cards, articles: articles })
    });

});

module.exports = router;