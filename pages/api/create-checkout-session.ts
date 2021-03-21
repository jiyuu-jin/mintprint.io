import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_KEY, {
  apiVersion: "2020-08-27",
});
//const stripe = require('stripe')(process.env.STRIPE_KEY);
//import {loadStripe} from '@stripe/stripe-js';

/*import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
}*/

export default async (req, res) => {

  const { printCID } = req.query;

  const productPrices = {
      '71': 2000,
      '3': 3000,
      '186': 1500,
  }

  if (req.method === 'POST') {
    const imageFile = printCID || 'https://ipfs.io/ipfs/QmQP8PxFWkqoSFwzi3RBHyS5tnDct2bnwaA2TzNL4mwbvf';
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      client_reference_id: imageFile,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'MintPrint',
              images: [ imageFile ],
            },
            unit_amount: productPrices[req.body.itemType],
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `https://mintprint.io/success`,
      cancel_url: `https://mintprint.io/cancel`,
    });

    res.status(200).json({id: session.id });
  }
};