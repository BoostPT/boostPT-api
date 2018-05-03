import express from 'express';
import passport from 'passport';

import {
  loginController
} from './authController';

import passport from '../../middleware/validation/passport';

const router = express.Router();

router.route('/login')
  .post(passport.authenticate('local', { session: false }), loginController);

export default router;