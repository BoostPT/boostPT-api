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
  deleteFromExercises,
  getStarredExercisesByUser,
  fetchPublicWorkoutsByUser
} from './workoutSQLHelpers';

export const workoutQuery = async (payload, url) => {
  const splitted = url.split("/");
  if (url.slice(0,10) === '/exercises') {
    try {
      return await globalQueryHelper(payload, fetchExercisesByWorkout, 'fetchExercisesByWorkout', ['workout_id']);
    } catch (err) {
      return err;
    }
  } else if (url.slice(0,5) === '/user') {
    try {
      return await globalQueryHelper(payload, fetchWorkoutsByUser, 'fetchWorkoutsByUser', ['user_id']);
    } catch (err) {
      return err;
    }
  } else if (url.slice(0, 7) === '/delete') {
    try {
      // query for exercises by workout id
      const exercises = await globalQueryHelper(payload, fetchExerciseIdsByWorkout, 'fetchExerciseIdsByWorkout', ['workout_id']);
      await globalQueryHelper(payload, deleteFromExerciseWorkout, 'deleteFromExerciseWorkout', ['workout_id']);
      await globalQueryHelper(payload, deleteStarWorkout, 'deleteStarWorkout', ['workout_id', 'user_id']);
      await globalQueryHelper(payload, deleteFromUsersWorkouts, 'deleteFromUsersWorkouts', ['workout_id']);
      // iterate over exercises and delete each from exercises
      let i = 0;
      while (i < exercises.rows.length) {
        payload.id = exercises.rows[i].id;
        await globalQueryHelper(payload, deleteFromExercises, 'deleteFromExercises', ['id']);
        i++;
      }
      await globalQueryHelper(payload, deleteFromWorkouts, 'deleteFromWorkouts', ['workout_id']);
    } catch (err) {
      return err;
    }
  } else if (url.slice(0, 17) === '/starredexercises') {
    return await globalQueryHelper(payload, getStarredExercisesByUser, 'getStarredExercisesByUser', ['user_id']);
  }else if(splitted[1] === "public"){
    return await globalQueryHelper(payload, fetchPublicWorkoutsByUser, 'fetchPublicWorkoutsByUser', ['user_id', 'is_public']);
  }
};