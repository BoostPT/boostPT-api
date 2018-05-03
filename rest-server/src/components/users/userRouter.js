import express from 'express';

import {
  userController
} from './userControllers';

const router = express.Router();

router.route('/')
  .get(userController);

export default router;