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

// const cookieExtractor = (req) => {
//   let token = null;
//   if (req && req.cookies) token = req.cookies['jwt'];
//   return token;
// };

const cookieOptions = {
  maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  httpOnly: true,
  signed: true
};

export const signUpController = async (req, res) => {
  try {
    req.body.password = await hashPassword(req.body.password);
    const { rows } = await signUpQuery(req.body);
    const { id, email } = rows[0];
    success('signUpController - successfully retrieved data ', JSON.stringify(rows[0]));
    const token = await genToken(id, email);
    // rows[0].token = token;
    res.cookie('jwt', token, cookieOptions);
    // return res.status(200).append('authorization', JSON.stringify(token)).send(rows[0]);
    return res.status(200).send(rows[0]);
  } catch (err) {
    let errMessage;
    error('signUpController - error= ', err);
    if (err.message.includes('email')) {
      // duplicate key value violates unique constraint "users_email_key"
      errMessage = 'Email already exists';
    } else if (err.message.includes('username')) {
      // duplicate key value violates unique constraint "users_username_key"
      errMessage = 'Username already exists';
    }
    return res.status(409).send(errMessage);
  }
};

export const loginController = async (req, res) => {
  try {
    const { rows } = await loginQuery(req.body);
    delete rows[0].password;
    const { id, email } = rows[0];
    console.log('loginController - successfully retrieved data ', rows[0]);
    const token = await genToken(id, email);
    // res.cookie('jwt', token, cookieOptions);
    // return res.status(200).append('Successful Auth', JSON.stringify(token)).send(rows[0]);
    res.set('Set-Cookie', `jwt=${token}; Expires=${cookieOptions.maxAge}; HttpOnly`);
    return res.status(200).send(rows[0]);
  } catch (err) {
    console.log('loginController - error= ', err);
  }
};