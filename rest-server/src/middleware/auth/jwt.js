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

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) token = req.cookies['jwt'];
  return token;
};

export const verifyUserWithCookieJWT = (req, res, next) => {
  try {
    const token = cookieExtractor(req);
    verify(token, process.env.TOKEN_SECRET);
    success('token verified');
  } catch (err) {
    console.log("Error verifying cookie");
    error('token not verified');
    next(e);
  }
};