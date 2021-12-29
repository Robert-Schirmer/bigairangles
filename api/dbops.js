import pool from './db';

/*
* Add a new image to the database with optional meta data
*/
export const addImage = (imageSrc, metaDataArr = []) => {
  return new Promise((resolve, reject) => {
    let query = 'SET autocommit = 0;START TRANSACTION;';
    query += `INSERT INTO images (src, posted) VALUES ('${imageSrc}', now());`;
    if (metaDataArr.length) {
      // Store the new image ID, to be used for meta data foreign key
      query += 'SET @new_image_id = LAST_INSERT_ID();'
    }
    for (const metaData of metaDataArr) {
      query += `INSERT INTO image_properties (image_id, label, value) VALUES (@new_image_id, '${metaData.label}', '${metaData.value}');`;
    }
    query += 'COMMIT;';
    pool.query(query, (error, elements) => {
      if (error) {
        reject(error);
      }
      return resolve(elements);
    })
  })
}

/*
* Add meta data to image
*/
export const addMetaData = (imageSrc, metaDataArr = []) => {
  return new Promise((resolve, reject) => {
    let query = 'SET autocommit = 0;START TRANSACTION;';
    for (const metaData of metaDataArr) {
      query += `INSERT INTO image_properties (image_id, label, value) VALUES (${imageSrc}, '${metaData.label}', '${metaData.value}');`;
    }
    query += 'COMMIT;';
    pool.query(query, (error, elements) => {
      if (error) {
        reject(error);
      }
      return resolve(elements);
    })
  })
}

/*
* Retrieve all images in correct format
*/
export const getAllImagees = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT
                    images.image_id,
                    images.src,
                    images.mainimage,
                    CONCAT('[', GROUP_CONCAT(CONCAT('{"label":"', image_properties.label, '","value":"', image_properties.value, '"}') SEPARATOR ','), ']') as meta
                  FROM
                    images
                  LEFT JOIN image_properties on
                    images.image_id = image_properties.image_id
                  GROUP BY
                    images.image_id`;
    pool.query(query, (error, elements) => {
      if (error) {
        reject(error);
      }
      // Parse the meta field that is a json string
      elements.forEach((result) => {
        result.meta = JSON.parse(result.meta);
        return result;
      })
      return resolve(elements);
    })
  })
}
