import axios from 'axios';
import { NFTStorage, Blob } from 'nft.storage';
import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';

export const config = {
  api: {
    bodyParser: false,
  }
};

export default async (req, res) => {

  const { fileURL } = req.query;

  const client = new NFTStorage({ token: process.env.NFT_STORAGE_KEY });

  let cid: string;

  if (fileURL) {
    const { data } = await axios.get(fileURL, {responseType: 'arraybuffer'});

    const blob = new Blob([data]);

    cid = await client.storeBlob(blob);
  } else {
    const { files }: any = await new Promise((resolve, reject) => {
    const form = new IncomingForm();
  
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });
  
    const file = await fs.readFile(files.file.path);
  
    const content = new Blob([file]);
    cid = await client.storeBlob(content);
  }

  res.status(200).json(cid);
}
