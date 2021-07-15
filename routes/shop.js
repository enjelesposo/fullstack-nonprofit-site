const router = require('express').Router();
const pool = require('../db');

// render adoption page
router.get('/adopt', async (req, res) => {
    try {
        const getTurtles = await pool.query("SELECT * FROM adoptable_turtles");
        res.render('adopt', { title: 'Adopt a Sea Turtle', turtles: getTurtles.rows });
    }
    catch (err) {
        console.error(err.message);
    }
});

// render adoption details
router.get('/adopt/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const getTurtles = await pool.query("SELECT * FROM adoptable_turtles WHERE id=$1", [id]);
        res.render('details', { title: "Adopt a Sea Turtle", turtle: getTurtle.rows[0] });
    }
    catch (err) {
        console.error(err.message);
    }
})

module.exports = router;