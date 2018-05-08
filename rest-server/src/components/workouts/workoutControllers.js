import { globalController } from '../../lib/utils/queryHelpers';
import { workoutQuery } from './workoutQueries';

import { globalQueryHelper } from "../../lib/utils/queryHelpers";
import { addWorkoutHelper } from './workoutSQLHelpers';


export const addWorkoutController = async (req, res) => {

  const workOut = await globalQueryHelper(req.body, addWorkoutHelper, 'addWorkoutHelper', ['workoutName', 'user_id', 'isPublic']);

  const workoutId = workOut.rows[0].id

  console.log('workout', workoutId);

  res.status(200).send(workOut)

  // req.body { user_id: 2,
  //   workoutName: 'test workout',
  //   exerciseForms:
  //   [ { type: 'Strength',
  //     name: 'push up',
  //     description: '90 deg',
  //     Reps: '10',
  //     Sets: '3' },
  //     { type: 'Cardio',
  //       name: 'treadmill',
  //       description: 'flat',
  //       Distance: '2 miles',
  //       Pace: '7:30',
  //       'Goal Time': '' },
  //     { type: 'Stretch',
  //       name: 'hammy',
  //       description: 'both legs',
  //       'Goal Time': '1min' } ],
  //     isPublic: false }


};

export const workoutController = globalController(workoutQuery , 'workoutController');