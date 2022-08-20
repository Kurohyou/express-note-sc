import * as fs from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { v1 as uuid } from 'uuid';

/**
 * Returns the text contents of the file specified.
 * @param {string} pathString - The relative path to the file
 */
const getFile = (pathString) => fs.readFile(
    path.resolve(pathString),
    'utf8'
  );

/**
 * 
 * @param {string} pathString 
 * @param {any} data - Data to write the file
 */
const writeFile = (pathString,data) => fs.writeFile(
    path.resolve(pathString),
    data,
    'utf8'
  );

/**
 * Gets the database data and returns the parsed version of the array.
 * @param {Object} [newObj] - The object to add to the database
 * @param {Object} [data] - Object to set the database to
 * @returns {Object[]} - The updated database array
 */
export const db = async ({newObj,data}) => {
  const dbJson = data || 
    await getFile('./db/db.json')
      .then(data => JSON.parse(data));
    if(data){
      console.log('dbJson',data);
    }
  if(newObj){
    newObj.id = uuid();
    dbJson.push(newObj);
  }
  if(newObj || data){
    await writeFile('./db/db.json',JSON.stringify(dbJson,null,2));
  }
  return dbJson;
};