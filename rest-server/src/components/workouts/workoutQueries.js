import { globalQueryHelper } from '../../lib/utils/queryHelpers';
import {
  createWorkoutHelper,
  fetchWorkoutsHelper
} from './workoutSQLHelpers';

export const workoutQuery = async (payload, url) => {
  if (url === '/addWorkout') {
    return await globalQueryHelper(payload, createWorkoutHelper, 'createWorkoutHelper', [/* ADD VALUE FIELDS */]);
  } else {
    return await globalQueryHelper(payload, fetchWorkoutsHelper, 'fetchWorkoutsHelper', []);
  }
};