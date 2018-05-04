import Joi from 'joi';

export default {
  signUp: {
    body: {
      email: Joi.string().email(),
      username: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/),
      password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/),
    }
  },
  login: {
    body: {
      email: Joi.string().email(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/),
    }
  }
}