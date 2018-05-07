import express from 'express';

import {
  userController
} from './userControllers';

import {
  fetchNonUserClientsController
} from './userControllers';

const router = express.Router();

// router.route('/')
//   .get(userController);

router.route('/:trainer_id')
  .get(fetchNonUserClientsController);

export default router;