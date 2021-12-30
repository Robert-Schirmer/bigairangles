import { Storage } from '@google-cloud/storage';

export default async function handler(req, res) {
  // Creates a client
  const storage = new Storage();
  // Lists files in the bucket
  const [files] = await storage
    .bucket('big_air_public_assets')
    .getFiles({ prefix: 'images', delimiter: '_small' });
  return res.status(200).json({
    files: files.map((file) => file.name),
    length: files.length,
  });
}
