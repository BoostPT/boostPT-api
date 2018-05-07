import { globalQueryHelper } from '../../lib/utils/queryHelpers';
import {
  fetchAllUserHelper,
  fetchUserHelper
} from './userSQLHelpers';
import {
  fetchAllClientNonUserHelper, 
} from './userSQLHelpers';

// export const userQuery = async (payload, url) => {
//   if (url === '/') {
//     return await globalQueryHelper(payload, fetchAllUserHelper, 'fetchAllUserHelper', []);
//   }
// };

export const fetchClientNonUserQuery = async (payload) => {
  return await globalQueryHelper(payload, fetchAllClientNonUserHelper, 'nonUserClientsController', ['trainer_id']);
}