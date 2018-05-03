import { globalQueryHelper } from '../../lib/components';
import {
  fetchAllUserHelper,
  fetchUserHelper
} from './userSQLHelpers';

export const userQuery = async (payload, url) => {
  if (url === '/') {
    return await globalQueryHelper(payload, fetchAllUserHelper, 'fetchAllUserHelper', []);
  }
};