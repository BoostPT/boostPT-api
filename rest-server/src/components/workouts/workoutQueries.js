import { globalQueryHelper } from '../../lib/utils/queryHelpers';
import {
  fetchUserWorkoutsHelper,
  createWorkoutHelper,
} from './workoutSQLHelpers';

// export const workoutQuery = async (payload, url) => {
//   return await globalQueryHelper(payload, fetchUserWorkoutsHelper, 'fetchUserWorkoutsHelper', []);
// }

export const workoutQuery = async (payload, url) => {
  if (url === '/addWorkout') {
    return await globalQueryHelper(payload, createWorkoutHelper, 'createWorkoutHelper', [/* ADD VALUE FIELDS */]);
  } else {
    // return await globalQueryHelper(payload, fetchWorkoutsHelper, 'fetchWorkoutsHelper', []);
    return await globalQueryHelper(payload, fetchUserWorkoutsHelper, 'fetchUserWorkoutsHelper', []);
  }
};