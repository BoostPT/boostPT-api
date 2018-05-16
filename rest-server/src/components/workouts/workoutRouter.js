import express from 'express';

import {
  workoutController,
  addWorkoutController,
  starWorkoutController,
  starExerciseController
} from './workoutControllers';

const router = express.Router();

router.route('/addWorkout')
  .post(addWorkoutController);

router.route('/user/:user_id')
  .get(workoutController);

router.route('/exercises/:workout_id')
  .get(workoutController);

router.route('/starworkout')
  .post(starWorkoutController);

router.route('/starexercise')
  .post(starExerciseController);

export default router;