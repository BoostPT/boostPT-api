import {
  sign,
  verify,
} from 'jsonwebtoken';
import {
  success,
  error
} from '../../lib/log';

export const genToken = (id, email) => {
  const token = {};

  token.accessToken = sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    email,
    id,
  }, process.env.TOKEN_SECRET);

  return token;
};

const convertCookieToObject = (cookie) => {
  let result = {};
  cookie.split('; ').forEach(v => {
    let k = v.split('=');
    result[k[0]] = k[1];
  });
  return result;
};

const tokenExtractor = (req) => {
  let token = null;
  if (req && req.headers.authorization) {
    const cookies = convertCookieToObject(req.headers.authorization);
    token = cookies['jwt'];
  }
  return token;
};

export const verifyUserWithJWT = (req, res, next) => {
  try {
    const token = tokenExtractor(req);
    verify(token, process.env.TOKEN_SECRET);
    success('token verified');
    next();
  } catch (err) {
    error('token not verified');
    next(err);
  }
};