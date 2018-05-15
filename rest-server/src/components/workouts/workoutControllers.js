import { globalController, addExercisesQueryHelper } from '../../lib/utils/queryHelpers';
import { 
  workoutQuery
} from './workoutQueries';

import { globalQueryHelper } from "../../lib/utils/queryHelpers";
import {
  addWorkoutHelper,
  addUsersWorkoutEntryHelper,
  addExerciseHelper,
  addExerciseWorkoutEntryHelper,
  starWorkoutExistance,
  starWorkout,
  deleteStarWorkout
} from './workoutSQLHelpers';

import {
  success,
  error
} from '../../lib/log';

export const workoutController = globalController(workoutQuery, 'workoutController');

const addExercisesAndJoinTable = async (exerciseForms, workoutId) => {
  let exercisesPayload = [];
  for (let i = 0; i < exerciseForms.length; i++) {
    let type;
    if (exerciseForms[i].type === 'Warm-up') {
      type = 0;
    } else if (exerciseForms[i].type === 'Strength') {
      type = 1;
    } else if (exerciseForms[i].type === 'Cardio') {
      type = 2;
    } else if (exerciseForms[i].type === 'Stretch') {
      type = 3;
    }
    // Key options: (name, description, type, reps, sets, distance, pace, goaltime)
    let exercise = [exerciseForms[i].name];
    exercise.push(exerciseForms[i]['description'] ? exerciseForms[i]['description'] : null);
    exercise.push(type);
    exercise.push(exerciseForms[i]['Reps'] ? parseInt(exerciseForms[i]['Reps']) : null);
    exercise.push(exerciseForms[i]['Sets'] ? parseInt(exerciseForms[i]['Sets']) : null);
    exercise.push(exerciseForms[i]['Distance'] ? exerciseForms[i]['Distance'] : null);
    exercise.push(exerciseForms[i]['Pace'] ? exerciseForms[i]['Pace'] : null);
    exercise.push(exerciseForms[i]['Goal Time'] ? exerciseForms[i]['Goal Time'] : null);

    exercisesPayload.push(exercise);
  }

  try {
    const exerciseIds = await addExercisesQueryHelper(exercisesPayload, addExerciseHelper, 'addExerciseHelper');

    for (let i = 0; i < exerciseIds.length; i++) {
      const exerciseWorkoutPayload = {
        exerciseId: exerciseIds[i],
        workoutId,
        orderIndex: i
      };
      await globalQueryHelper(exerciseWorkoutPayload, addExerciseWorkoutEntryHelper, 'addExerciseWorkoutEntryHelper', Object.keys(exerciseWorkoutPayload));
    }
  }
  catch(err) {
    error(`addExercisesAndJoinTable - error= ${err}`);
  }

};

export const addWorkoutController = async (req, res) => {

  try {
    const workOut = await globalQueryHelper(req.body, addWorkoutHelper, 'addWorkoutHelper', ['workoutName', 'user_id', 'isPublic']);
    const workoutId = workOut.rows[0].id;

    const userWorkOutPayload = {
      userId: req.body.user_id,
      workoutId
    };

    await globalQueryHelper(userWorkOutPayload, addUsersWorkoutEntryHelper, 'addUsersWorkoutEntryHelper', ['userId', 'workoutId']);

    await addExercisesAndJoinTable(req.body.exerciseForms, workoutId);

    success(`addWorkoutController - successfully inserted workout, exercises, and join tables`);
    return res.status(200).send()
  }
  catch(err) {
    error(`addWorkoutController - error= ${err}`);
    return res.status(500).send(err);
  }
};

export const starWorkoutController = async (req, res) => {

  try {
    const star = await globalQueryHelper(req.body, starWorkoutExistance, 'starWorkoutExistance', ['workout_id', 'user_id']);

    if (star.rows[0].exists) {
      await globalQueryHelper(req.body, deleteStarWorkout, 'deleteStarWorkout', ['workout_id', 'user_id']);
      success(`starWorkoutController - successfully deleted workout star`);
    } else {
      await globalQueryHelper(req.body, starWorkout, 'starWorkout', ['workout_id', 'user_id']);
      success(`starWorkoutController - successfully starred workout`);
    }
    return res.status(200).send()
  }
  catch(err) {
    error(`starWorkoutController - error= ${err}`);
    return res.status(500).send(err);
  }

};