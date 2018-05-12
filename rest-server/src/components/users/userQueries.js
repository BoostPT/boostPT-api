import { globalQueryHelper } from '../../lib/utils/queryHelpers';
import {
  fetchAllClientNonUserHelper, 
} from './userSQLHelpers';
import {
  addClientNonUserHelper
} from './userSQLHelpers';

export const fetchClientNonUserQuery = async (payload) => {
  return await globalQueryHelper(payload, fetchAllClientNonUserHelper, 'fetchClientNonUserController', ['trainer_id']);
}

export const addClientNonUserQuery = async (payload) => {
  return await globalQueryHelper(payload, addClientNonUserHelper, 'addClientNonUserController', ['client_name', 'trainer_id']);
}