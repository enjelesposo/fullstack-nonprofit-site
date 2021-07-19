const router = require('express').Router();
const fs = require('fs');

router.get('/', (req, res) => {
    fs.readFile('./fixtures/galleryImages.json', 'utf8', (err, data) => {
        if(err) {
            res.status(500).end();
        }
        else {
            res.render('gallery', { title: 'Gallery', images: JSON.parse(data) });
        }
    })
});

module.exports = router;