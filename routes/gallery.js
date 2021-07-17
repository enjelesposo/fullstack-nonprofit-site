const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('gallery', { title: 'Gallery' });
});

module.exports = router;