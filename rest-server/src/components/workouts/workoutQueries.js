import { globalQueryHelper } from '../../lib/utils/queryHelpers';
import {
  fetchUserWorkoutsHelper,
  createWorkoutHelper,
  fetchExercisesByWorkout,
  fetchWorkoutsByUser,
  deleteFromWorkouts,
  deleteFromExerciseWorkout,
  deleteFromUsersWorkouts,
  fetchExerciseIdsByWorkout,
  deleteFromExercises
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
    // query for exercises by workout id
    const exercises = await globalQueryHelper(payload, fetchExerciseIdsByWorkout, 'fetchExerciseIdsByWorkout', ['workout_id']);
    await globalQueryHelper(payload, deleteFromExerciseWorkout, 'deleteFromExerciseWorkout', ['workout_id']);
    await globalQueryHelper(payload, deleteFromUsersWorkouts, 'deleteFromUsersWorkouts', ['workout_id']);
    // iterate over exercises and delete each from exercises
    let i = 0;
    while (i < exercises.rows.length) {
      payload.id = exercises.rows[i].id;
      await globalQueryHelper(payload, deleteFromExercises, 'deleteFromExercises', ['id']);
      i++;
    }
    await globalQueryHelper(payload, deleteFromWorkouts, 'deleteFromWorkouts', ['workout_id']);
  }
};