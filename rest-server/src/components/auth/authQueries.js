import db from '../../config/database';
import { queryPayloadOrganizer } from '../../lib/utils/queryHelpers';
import {
  signUpHelper,
  loginHelper
} from './authSQLHelpers';
import {
  success,
  error
} from '../../lib/log';

export const signUpQuery = async (payload) => {
  try {
    const query = {
      text: signUpHelper,
      values: queryPayloadOrganizer(payload, ['username', 'email', 'password', 'isTrainer'])
    };
    const data = await db.query(query);
    success('signUpQuery - successfully retrieved data ', JSON.stringify(data));
    return data;
  } catch (err) {
    error('signUpQuery - error= ', err);
    throw new Error(err);
  }
};

export const loginQuery = async (payload) => {
  try {
    const query = {
      text: loginHelper,
      values: queryPayloadOrganizer(payload, ['email'])
    };
    const data = await db.query(query);
    success('loginQuery - successfully retrieved data ', data);
    return data;
  } catch (err) {
    error('loginQuery - error= ', err);
    throw new Error(err);
  }
};
