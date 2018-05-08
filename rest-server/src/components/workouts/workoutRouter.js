import express from 'express';

import {
  workoutController
} from './workoutControllers';

const router = express.Router();

router.route('/')
  .get(workoutController);

router.route('/addWorkout')
  .post(workoutController);

export default router;