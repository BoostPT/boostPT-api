import express from 'express';

import {
  fetchNonUserClientsController,
  addNonUserClientsController,
  userController,
  userPictureEdit,
  fetchAllTrainers,
  addTrainerRequest
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

router.route('/request')
  .post(addTrainerRequest);

// router.route('/request-in/:client_id/:trainer_id')
//   .get(addTrainerRequest);

// router.route('/request-out/:client_id/:trainer_id')
//   .get(addTrainerRequest);



export default router;