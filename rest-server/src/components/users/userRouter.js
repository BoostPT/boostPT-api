import express from 'express';

import {
  userController
} from './userControllers';

import {
  fetchNonUserClientsController
} from './userControllers';

import {
  addNonUserClientsController
} from './userControllers';

const router = express.Router();

// router.route('/')
//   .get(userController);

router.route('/:trainer_id')
  .get(fetchNonUserClientsController);

router.route('/addnonuserclient')
  .post(addNonUserClientsController);

export default router;