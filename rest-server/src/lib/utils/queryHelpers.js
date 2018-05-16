import db from '../../config/database';
import {
  success,
  error
} from '../log';

export const queryPayloadOrganizer = (payload, columns) => {
    /**
     * @param {Object} payload - payload from request body
     * @param {Array} columns - columns for the table in the precise order
     * 
     * @return {Array} values from request body loaded into an array with a set order
     */
    if (columns.length) {
      const values = [];
      columns.forEach(column => {
        values.push(payload[column]);
      });
      return values;
    } else {
      return columns;
    }
  };

export const globalQueryHelper = async (payload, queryString, name, columns=[]) => {
  /**
   * @param {Object} payload - req.body || req.params
   * @param {Function} query - returns the SQL statement used to query the db
   * @param {String} name - used as an identifier for development, identifies which query is being executed
   * @param {Array} columns - list of fields for parameterized query
   * 
   * @return {Object} - rows from database query
   */
  try {
    //console.log(payload);
    const query = {
      name,
      text: queryString,
      values: queryPayloadOrganizer(payload, columns),
    };
    const data = await db.query(query);
    success(`${name} - successfully retrieved data ${JSON.stringify(data)}`);
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
    const splittedUrl = url.split("/");
    let payload;

    if (method === 'POST' || method === 'PUT') {
      payload = req.body;
    } else {
      payload = req.params;
    }

    if(splittedUrl[1] === "public"){
      payload.is_public = true;
    }
    
    try {
      const { rows } = await query(payload, url) || {};
      success(`${name} - sucessfully retrieved data ${JSON.stringify(rows)}`);
      if(rows.length === 0){
        return res.status(200).send(payload);
      }else{
        return res.status(200).send(rows);
      }
    } catch (err) {
      error(`${name} - error= ${err}`);
      return res.status(500).send(err);
    }
  }
};

export const addExercisesQueryHelper = async (payload, queryString, name) => {
  /**
   * @param {Array} payload - array of exercises
   *
   * @return {Array} exerciseIds - array of exercise id's from database query
   */

  let exerciseIds = [];
  try {
    await db.query('BEGIN');
    for (let i = 0; i < payload.length; i++) {
      const query = {
        name,
        text: queryString,
        values: payload[i]
      };
      const { rows } = await db.query(query);
      exerciseIds.push(rows[0].id);
    }
    await db.query('COMMIT');
    success(`${name} - successfully inserted exercises and retrieved exerciseIds ${exerciseIds}`);
    return exerciseIds;
  } catch (err) {
    await db.query('ROLLBACK');
    error(`${name} - error= ${err}`);
    throw new Error(err);
  }
};