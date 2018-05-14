import express from 'express';

import {
  workoutController,
  addWorkoutController
} from './workoutControllers';

const router = express.Router();


router.route('/addWorkout')
.post(addWorkoutController);

router.route('/user/:user_id')
.get(workoutController);

router.route('/exercises/:workout_id')
  .get(workoutController);

router.route('/workouts/:workout_id')
  .delete(workoutController);

export default router;