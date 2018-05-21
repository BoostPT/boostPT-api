import express from 'express';

import {
  eventsController,
  addEventController
} from './eventsController';

const router = express.Router();

router.route('/:userId').get(eventsController);

router.route('/workout').post(addEventController);

// router.route().get(eventController);

export default router;