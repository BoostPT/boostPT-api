import { globalQueryHelper } from '../../lib/utils/queryHelpers';
import {
  fetchUserWorkoutsHelper,
  createWorkoutHelper,
  fetchExercisesByWorkout,
  fetchWorkoutsByUser
} from './workoutSQLHelpers';

// export const workoutQuery = async (payload, url) => {
//   return await globalQueryHelper(payload, fetchUserWorkoutsHelper, 'fetchUserWorkoutsHelper', []);
// }

export const workoutQuery = async (payload, url) => {
  if (url === '/addWorkout') {
    return await globalQueryHelper(payload, createWorkoutHelper, 'createWorkoutHelper', [/* ADD VALUE FIELDS */]);
  } else if (url.slice(0,10) === '/exercises') {
    return await globalQueryHelper(payload, fetchExercisesByWorkout, 'fetchExercisesByWorkout', ['workout_id']);
  } else if (url.slice(0,5) === '/user') {
    return await globalQueryHelper(payload, fetchWorkoutsByUser, 'fetchWorkoutsByUser', ['user_id']);
  } else {
    // return await globalQueryHelper(payload, fetchWorkoutsHelper, 'fetchWorkoutsHelper', []);
    return await globalQueryHelper(payload, fetchUserWorkoutsHelper, 'fetchUserWorkoutsHelper', []);
  }
};