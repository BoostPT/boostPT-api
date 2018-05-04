import db from '../../config/database';
import {
  signUpQuery,
  loginQuery
} from './authQueries';
import {
  success,
  error
} from '../../lib/log';

import { genToken } from '../../middleware/auth/jwt';
import { hashPassword } from '../../middleware/auth/bcrypt'

//login controller needs to attach the cookie to the response... res.cookie res.cookie('jwt',token);

// const cookieExtractor = (req) => {
//   let token = null;
//   if (req && req.cookies) token = req.cookies['jwt'];
//   return token;
// };

export const signUpController = async (req, res) => {
  try {
    req.body.password = await hashPassword(req.body.password);
    const { rows } = await signUpQuery(req.body);
    const { id, email } = rows[0];
    success('signUpController - successfully retrieved data ', JSON.stringify(rows[0]));
    const token = await genToken(id, email);
    rows[0].token = token;
    return res.status(200).append('authorization', JSON.stringify(token)).send(rows[0]);
  } catch (err) {
    error('signUpController - error= ', err);
    throw new Error(err);
  }
};

export const loginController = async (req, res) => {
  try {
    const { rows } = await loginQuery({email});
    delete rows[0].password;
    const { id, email } = rows[0];
    console.log('loginController - successfully retrieved data ', rows[0]);
    const token = await genToken(id, email);
    // res.cookie('jwt',token);
    return res.status(200).append('Successful Auth', JSON.stringify(token)).send(rows[0]);
  } catch (err) {
    console.log('loginController - error= ', err);
  }
};