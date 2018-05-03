import db from '../../config/database';
import { queryPayloadOrganizer } from './util';
import {
  success,
  error
} from '../log';

/**
 * These functions are for basic CRUD operations only.
 * 
 * Create unique controllers and queries if you need to manipulate the data
 */

export const globalQueryHelper = async (payload, queryString, name, columns=[]) => {
  /**
   * @param {Object} payload - req.body || req.params
   * @param {Function} query - returns the SQL statement used to query the db
   * @param {String} name - used as an identifier for development, identifies which query is being executed
   * @param {Array} columns - list of fields for parameterized query
   * 
   * @return {Object} rows from database query
   */
  try {
    const query = {
      name,
      text: queryString,
      values: queryPayloadOrganizer(payload, columns),
    };
    const data = db.query(query);
    success(`${name} - successfully retrived data ${JSON.stringify(data)}`);
    return data;
  } catch (err) {
    error(`${name} - error= ', ${err}`);
    throw new Error(err);
  }
};

export const globalController = (query, name) => {
  /**
   * @param {Function} query - the query built with the globalQueryHelper, evaluates the url to use the appropriate SQL statement to query the database
   * @param {String} name - used as an identifier for development, identifies which controller is being executed
   * 
   * @return {Function} returns a promisified controller
   */
  return async (req, res) => {
    const { url, method } = req;
    let payload;
    if (method === 'POST' || method === 'PUT') {
      payload = req.body;
    } else {
      payload = req.params;
    }
    try {
      const { rows } = await query(payload, url);
      success(`${name} - sucessfully retrieved data ${JSON.stringify(rows)}`);
      return res.status(200).send(rows);
    } catch (err) {
      error(`${name} - error= ${err}`);
      return res.status(500).send(err);
    }
  }
};