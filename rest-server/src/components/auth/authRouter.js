import express from 'express';
import validate from 'express-validation';
import passport from 'passport';
import formValidation from '../../middleware/validation/auth-req-validation';
import { loginController } from './authController';
import '../../middleware/validation/passport';

const router = express.Router();

router.route('/signup')
  .post(validate(formValidation.signUp), signUpController);

router.route('/login')
  .post(validate(formValidation.login), passport.authenticate('local', { session: false }), loginController);

export default router;