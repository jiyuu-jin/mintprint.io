import axios from 'axios';

export default async (req, res) => {

  const options = {
    auth: {
      username: `${process.env.PRINTFUL}`,
      password: ``,
    },
  };

  const { item } = req.query;

  const itemTemplates = await axios.get(`https://api.printful.com/mockup-generator/templates/${item}`, options);
  const itemPrintFiles = await axios.get(`https://api.printful.com/mockup-generator/printfiles/${item}`, options);

  res.status(200).json({
    "itemTemplates": itemTemplates.data.result.templates,
    "itemPrintFiles": itemPrintFiles.data.result
  });
};
