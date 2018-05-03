import {
  sign,
  verify,
} from 'jsonwebtoken';

export const genToken = (id, email) => {
  const token = {};

  token.accessToken = sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    email,
    id,
  }, process.env.TOKEN_SECRET);

  return token;
};

export const verifyUserWithCookieJWT = (req, res, next) => {
  try {
    verify(req.cookies['jwt']);
  } catch (err) {
    console.log("Error verifying cookie");
  }
}