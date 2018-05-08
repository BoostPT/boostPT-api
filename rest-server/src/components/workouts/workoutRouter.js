import express from 'express';

import {
  workoutController,
  addWorkoutController

} from './workoutControllers';

const router = express.Router();

router.route('/:user_id')
  .get(workoutController);

router.route('/addWorkout')
  .post(addWorkoutController);

export default router;