import { Client } from 'pg';

export default async (req, res) => {
  const client = new Client();
  await client.connect();

  let queryResponse = {rows: [{message: "Endpoint only supports get"}]};

  if (req.method === 'POST') {
    queryResponse = await client.query(`INSERT INTO prints (shortName, tokenAddress, tokenID, printCID)
    VALUES ($1, $2, $3, $4)`, [req.body.ShortName, req.body.tokenAddress, req.body.tokenID, req.body.printCID]);
    await client.end();
  }else{
    const { name } = req.query;
    queryResponse = await client.query(`SELECT * FROM prints WHERE shortName=$1`, [name]);
    await client.end();
    console.log(queryResponse.rows[0]);
    res.status(200).json(queryResponse.rows[0]);
  };
};