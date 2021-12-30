import { getAllImagees } from "../../../api/dbops";

/*
* Retrieve all images
*/
export default async function handler(req, res) {
  const result = await getAllImagees();
  return res.status(200).json(result);
}
