import Stripe from "stripe";
import axios from "axios";
const stripe = new Stripe(process.env.STRIPE_KEY, {
  apiVersion: "2020-08-27",
});

export default async (req, res) => {
  const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

  if (req.method === 'POST') {
    const sig = req.headers['stripe-signature'];
    const body = req.body;
    let event = null;
  
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      // invalid signature
      res.status(400).end();
      return;
    }
  
    //let intent = null;
    //switch (event['type']) {
      if (event.type == 'checkout.session.completed') {//'payment_intent.succeeded':
        const intent = event.data.object;
        console.log("intent", intent);
        console.log("Succeeded:", intent.id);
        // printful call
        dispatchPrintful(intent.client_reference_id);
        
        res.status(200).json({status: "success"});
        //break;
    } else if( event.type == 'payment_intent.payment_failed') {
        const intent = event.data.object;
        const message = intent.last_payment_error && intent.last_payment_error.message;
        console.log('Failed:', intent.id, message);
        res.status(400).json({status: "failed"});
        //break;
    }
  }
};

async function dispatchPrintful(fileUrl: string) {
  const options = {
    auth: {
      username: `${process.env.PRINTFUL}`,
      password: ``,
    },
  };

  const body  = {
    recipient: {}, // TODO
    items: {
      quantity: 1,
      files: {
        url: fileUrl,
      },
    },
  };
  console.log("body:", body);

  // https://www.printful.com/docs/orders#actionEstimateCosts
  const orderResponse: any = await axios.post(
      `https://api.printful.com/order/`,
      body,
      options
   );
}