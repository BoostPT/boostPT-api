import { globalQueryHelper } from '../../lib/utils/queryHelpers';
import {
  addWorkoutHelper,
  fetchUserWorkoutsHelper
} from './workoutSQLHelpers';

export const workoutQuery = async (payload, url) => {
  if (url === '/addWorkout') {
    // return await globalQueryHelper(payload, addWorkoutHelper, 'addWorkoutHelper', [/* ADD VALUE FIELDS */]);
  } else {
    return await globalQueryHelper(payload, fetchUserWorkoutsHelper, 'fetchUserWorkoutsHelper', []);
  }
};