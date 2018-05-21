import express from 'express';

import {
  fetchNonUserClientsController,
  addNonUserClientsController,
  userController,
  userPictureEdit,
  fetchAllTrainers,
  addTrainerRequest,
  fetchTrainerRequestIn,
  fetchTrainerRequestOut
} from './userControllers';

const router = express.Router();

router.route('/request')
  .post(addTrainerRequest);

router.route('/request-in/:trainer_id')
  .get(fetchTrainerRequestIn);

router.route('/request-out/:client_id')
  .get(fetchTrainerRequestOut);
  
router.route('/trainers')
  .get(fetchAllTrainers);
  
router.route('/:trainer_id')
  .get(fetchNonUserClientsController);

router.route('/addnonuserclient')
  .post(addNonUserClientsController);

router.route('/:userId/picture')
  .put(userPictureEdit);




export default router;