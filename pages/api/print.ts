import { Client } from 'pg';

export default async (req, res) => {
  const client = new Client();
  await client.connect();

  let queryResponse = {rows: [{message: "Endpoint only supports get"}]};

  if (req.method === 'POST') {
    queryResponse = await client.query(`INSERT INTO prints (shortName, tokenAddress, tokenID, printType, printCID, productType)
    VALUES ($1, $2, $3, $4, $5, $6)`, [req.body.shortName, req.body.tokenAddress, req.body.tokenID, req.body.printType, req.body.printCID, req.body.productType]);
    await client.end();
    res.status(200).json({});
  } else {
    const { name } = req.query;
    queryResponse = await client.query(`SELECT * FROM prints WHERE shortName=$1`, [name]);
    await client.end();
    console.log(queryResponse.rows[0]);
    res.status(200).json(queryResponse.rows[0]);
  };
};
