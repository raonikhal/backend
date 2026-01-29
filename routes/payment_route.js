const mongoose = require("mongoose");
const createCheckoutSession = require("../controllers/StripeLogic/stripeLogic");

const express = require('express');


const router = express.Router();


router.post("/create_checkout_session", createCheckoutSession);


module.exports = router;