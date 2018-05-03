import { globalQueryHelper } from '../../lib/utils/queryHelpers.js';
import {
  fetchAllUserHelper,
  fetchUserHelper
} from './userSQLHelpers';

export const userQuery = async (payload, url) => {
  if (url === '/') {
    return await globalQueryHelper(payload, fetchAllUserHelper, 'fetchAllUserHelper', []);
  }
};