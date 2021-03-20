import { NFTStorage, Blob } from 'nft.storage';
import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';

export const config = {
  api: {
    bodyParser: false,
  }
};

export default async (req, res) => {

  const client = new NFTStorage({ token: process.env.NFT_STORAGE_KEY });

  const { files }: any = await new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

  const contents = await fs.readFile(files.file.path, { encoding: 'utf8' });

  const content = new Blob([contents]);
  const cid = await client.storeBlob(content);

  res.status(200).json(cid);
}
