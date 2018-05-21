import { globalQueryHelper } from '../../lib/utils/queryHelpers';

import {
  fetchEventsByUser
} from './eventsSQLHelpers';

export const eventQuery = async (payload, url) => {
  console.log("inside event query", url, payload);
  try{
    return await globalQueryHelper(payload, fetchEventsByUser, 'fetchEventsByUser', ['userId']);
  } catch (err) {
    return err;
  }
};