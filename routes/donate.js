const router = require('express').Router();
const fs = require('fs');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

router.get('/', (req, res) => {
    fs.readFile('./fixtures/packages.json', 'utf8',(error, data) => {
        res.render('donate', {title: 'Donate today', packages: JSON.parse(data)});
    })
})

router.post('/create-payment-intent', async (req, res) => {
    const {amount} = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd"
    })

    res.send({
        clientSecret: paymentIntent.client_secret
    });
});

router.get('/thanks', (req, res) => {
    res.render('thanks', { title: "Thank you :)", message: 'Thank you for donating!' });
})

module.exports = router;