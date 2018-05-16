import { globalQueryHelper } from '../../lib/utils/queryHelpers';

import {
  addClientNonUserHelper,
  fetchAllClientNonUserHelper, 
  fetchAllUserHelper,
  fetchUserHelper,
  addUserPictureHelper
} from './userSQLHelpers';

export const fetchClientNonUserQuery = async (payload) => {
  return await globalQueryHelper(payload, fetchAllClientNonUserHelper, 'fetchClientNonUserController', ['trainer_id']);
};


export const addClientNonUserQuery = async (payload) => {
  return await globalQueryHelper(payload, addClientNonUserHelper, 'addClientNonUserController', ['client_name', 'trainer_id']);
};

export const userQuery = async (payload, url) => {
  if (url === '/') {
    return await globalQueryHelper(payload, fetchAllUserHelper, 'fetchAllUserHelper', []);
  }
};

export const userAddPictureQuery = async (payload, url) => {
  if(url.split('/')[2] === 'picture'){
    return await globalQueryHelper(payload, addUserPictureHelper, 'fetchAllUserHelper', ['userId', 'pictureUrl']);
  }
};