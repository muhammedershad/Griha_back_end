import express from "express";
import Stripe from 'stripe';
require("dotenv").config();
const stripeApiKey: string = process.env.Strip_Private_Api_Key || "";
// const stripe = new Stripe(stripeApiKey);

const stripe = require('stripe')(stripeApiKey);

const account = await stripe.accounts.create({
  type: 'express',
});


const router = express.Router()

router.get('/', (req, res) => {
    console.log(stripe)
    res.json({ su: true})
})

router.post("/payment-intent", async(req,res)=>{
    const amount = 600
    //enter your checks whether the payment is correct
    const paymentIntent = await stripe.paymentIntents.create({
        amount ,
        currency: "usd",  
      });
      res.status(200).json(paymentIntent.client_secret);

    
    })
    

export default router