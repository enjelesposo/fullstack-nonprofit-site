const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('donate', {title: 'Donate today'});
})

module.exports = router;