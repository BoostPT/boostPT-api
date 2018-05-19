import express from 'express';

import {
  fetchNonUserClientsController,
  addNonUserClientsController,
  userController,
  userPictureEdit,
  fetchAllTrainers
} from './userControllers';

const router = express.Router();

router.route('/trainers')
  .get(fetchAllTrainers);
  
router.route('/:trainer_id')
  .get(fetchNonUserClientsController);

router.route('/addnonuserclient')
  .post(addNonUserClientsController);

router.route('/:userId/picture')
  .put(userPictureEdit);

export default router;