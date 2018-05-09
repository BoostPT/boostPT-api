import { globalController } from '../../lib/utils/queryHelpers';
import { workoutQuery } from './workoutQueries';

import { globalQueryHelper } from "../../lib/utils/queryHelpers";
import {
  addWorkoutHelper,
  addUsersWorkoutEntryHelper,
  addExerciseHelper,
  addExerciseWorkoutEntryHelper
} from './workoutSQLHelpers';

import {
  success,
  error
} from '../../lib/log';


export const workoutController = globalController(workoutQuery , 'workoutController');

const addExercisesAndJoinTable = async (exerciseForms, workoutId) => {
  for (let i = 0; i < exerciseForms.length; i++) {

    let exercisePayload = {
      name: exerciseForms[i].name,
      type: 0 // type: Warm-up
    };

    if (exerciseForms[i]['description']) exercisePayload.description = exerciseForms[i]['description'];

    switch (exerciseForms[i].type) {
      case 'Strength':
        exercisePayload.type = 1;
        if (exerciseForms[i]['Reps']) exercisePayload.reps = parseInt(exerciseForms[i]['Reps']);
        if (exerciseForms[i]['Sets']) exercisePayload.sets = parseInt(exerciseForms[i]['Sets']);
        break;
      case 'Cardio':
        exercisePayload.type = 2;
        if (exerciseForms[i]['Distance']) exercisePayload.distance = exerciseForms[i]['Distance'];
        if (exerciseForms[i]['Pace']) exercisePayload.pace = exerciseForms[i]['Pace'];
        if (exerciseForms[i]['Goal Time']) exercisePayload.goaltime = exerciseForms[i]['Goal Time'];
        break;
      case 'Stretch':
        exercisePayload.type = 3;
        if (exerciseForms[i]['Goal Time']) exercisePayload.goaltime = exerciseForms[i]['Goal Time'];
    }

    try {
      const exercise = await globalQueryHelper(exercisePayload, addExerciseHelper(Object.keys(exercisePayload)), 'addExerciseHelper', Object.keys(exercisePayload));
      const exerciseId = exercise.rows[0].id;

      const exerciseWorkoutPayload = {
        exerciseId,
        workoutId,
        orderIndex: i
      };
      await globalQueryHelper(exerciseWorkoutPayload, addExerciseWorkoutEntryHelper, 'addExerciseWorkoutEntryHelper', Object.keys(exerciseWorkoutPayload));
    }
    catch(err) {
      error(`addExercisesAndJoinTable - error= ${err}`);
    }
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