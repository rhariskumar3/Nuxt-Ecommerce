"use strict";

const Razorpay = require("razorpay");

let rzp = new Razorpay({
    key_id: process.env.RZP_KEY_ID,
    key_secret: process.env.RZP_KEY_SECRET,
});

exports.pay = rzp;