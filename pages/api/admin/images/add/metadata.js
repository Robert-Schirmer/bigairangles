import { addMetaData } from "../../../../../api/dbops";
import { validateAdminToken } from "../../../../../api/utils";

/*
* Insert new metadta for image into database
*/
export default async function handler(req, res) {
  try {
    validateAdminToken(req);
  } catch (error) {
    return res.status(403).json(`Unauthorized`);
  }
  const result = await addMetaData(1, [{ label: 'Meta data add', value: 'Meta data' }]);
  return res.status(200).json({
    result,
  });
}
