//login controller needs to attach the cookie to the response... res.cookie res.cookie('jwt',token);

import {genToken} from '../../middleware/auth/jwt';

export const loginController = async (req, res) => {
  try {
    const { loginQueryData } = await loginQueryData({email});
    delete loginQueryData[0].password;
    const { id, email } = loginQueryData[0];
    console.log('loginController - successfully retrieved data ', loginQueryData[0]);
    const token = await genToken(id, email);
    res.cookie('jwt',token);
    return res.status(200).append('Successful Auth', JSON.stringify(token)).send(loginQueryData[0]);
  } catch (err) {
    console.log('loginController - error= ', err);
  }
};