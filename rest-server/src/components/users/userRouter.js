import express from 'express';

import {
  fetchNonUserClientsController
} from './userControllers';

import {
  addNonUserClientsController
} from './userControllers';

const router = express.Router();

router.route('/:trainer_id')
  .get(fetchNonUserClientsController);

router.route('/addnonuserclient')
  .post(addNonUserClientsController);

export default router;