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

router.route('/delete/:workout_id')
  .delete(workoutController);
  
router.route('/public/user/:user_id')
  .get(workoutController);

router.route('/starworkout')
  .post(starWorkoutController);

router.route('/starexercise')
  .post(starExerciseController);

router.route('/starredexercises/:user_id')
  .get(workoutController);

export default router;