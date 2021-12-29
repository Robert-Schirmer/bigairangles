import { addImage } from "../../../../api/dbops";
import { validateAdminToken } from "../../../../api/utils";

/*
* Add new image
*/
export default async function handler(req, res) {
  try {
    validateAdminToken(req);
  } catch (error) {
    return res.status(403).json(`Unauthorized`);
  }
  if (req.method === 'PUT') {
    try {
      const bodyJSON = JSON.parse(req.body);
      const meta = bodyJSON.meta ?? [];
      const imageSrc = bodyJSON.src;
      // TODO: Needs more scrubbing
      if (Array.isArray(meta) && typeof imageSrc === 'string' && imageSrc.length) {
        await addImage(imageSrc, meta.filter((metarow) => metarow.value && metarow.label));
        return res.status(200).json('Image added');
      }
      else {
        return res.status(400).json(`Bad request`);
      }
    } catch (error) {
      if (error?.message.includes('Unexpected token')) {
        return res.status(400).json(`Unable to parse meta data`);
      }
      else {
        return res.status(500).json(`ERROR`);
      }
    }
  }
  return res.status(404).json(`${req.method} method not supported`);
}
