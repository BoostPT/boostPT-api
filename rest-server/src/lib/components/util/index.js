/**
 * util functions for components
 * 
 * to be used with the global controller and query
 * it organizes the payload to match the format needed to query the database
 */

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