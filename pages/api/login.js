import { setNewToken } from "../../api/utils";

export default async function handler(req, res) {
  try {
    const pass = req.body;
    if (pass === process.env.ADMIN_PASSWORD) {
      setNewToken(res);
      return res.status(200).json(`Login success`);
    }
  } catch (error) {
    console.error('Error performing login', error);
    return res.status(500).json(`Error performing login`);
  }
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return res.status(403).json('Unauthorized');
}
