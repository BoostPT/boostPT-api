import { globalQueryHelper } from '../../lib/utils/queryHelpers';
import {
  fetchUserWorkoutsHelper,
  createWorkoutHelper,
  fetchExercisesByWorkout,
  fetchWorkoutsByUser,
  deleteFromWorkouts,
  deleteFromExerciseWorkout,
  deleteFromUsersWorkouts
} from './workoutSQLHelpers';

// export const workoutQuery = async (payload, url) => {
//   return await globalQueryHelper(payload, fetchUserWorkoutsHelper, 'fetchUserWorkoutsHelper', []);
// }

export const workoutQuery = async (payload, url) => {
  if (url.slice(0,10) === '/exercises') {
    return await globalQueryHelper(payload, fetchExercisesByWorkout, 'fetchExercisesByWorkout', ['workout_id']);
  } else if (url.slice(0,5) === '/user') {
    return await globalQueryHelper(payload, fetchWorkoutsByUser, 'fetchWorkoutsByUser', ['user_id']);
  } else if (url.slice(0, 7) === '/delete') {
    await globalQueryHelper(payload, deleteFromExerciseWorkout, 'deleteFromExerciseWorkout', ['workout_id']);
    await globalQueryHelper(payload, deleteFromUsersWorkouts, 'deleteFromUsersWorkouts', ['workout_id']);
    await globalQueryHelper(payload, deleteFromWorkouts, 'deleteFromWorkouts', ['workout_id']);
  }
};