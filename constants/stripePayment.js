const stripe = require('stripe')(process.env.STRIPE_SECRET);

// create payment intent
const paymentIntent = 