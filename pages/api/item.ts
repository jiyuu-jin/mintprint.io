import axios from 'axios';

export default async (req, res) => {

  const options = {
    auth: {
      username: `${process.env.PRINTFUL}`,
      password: ``,
    },
  };

  const { item } = req.query;

  const resp = await axios.get(`https://api.printful.com/mockup-generator/templates/${item}`, options)
  res.status(200).json(resp.data.result.templates)
}
