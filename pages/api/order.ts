import axios from 'axios';

export default async (req, res) => {

  const options = {
    auth: {
      username: `${process.env.PRINTFUL}`,
      password: ``,
    },
  };

  if (req.method === 'POST') {
    console.log(req.body);
    const orderResponse: any = await axios.post(
      `https://api.printful.com/order/`,
      req.body,
      options
    );

    res.status(200).json(orderResponse)
  }
};