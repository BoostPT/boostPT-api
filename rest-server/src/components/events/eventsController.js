import { globalController } from '../../lib/utils/queryHelpers';

import { 
  eventQuery
} from './eventsQueries';

import { globalQueryHelper } from "../../lib/utils/queryHelpers";

import { addEventHelper } from './eventsSQLHelpers';

import {
  success,
  error
} from '../../lib/log';

export const eventsController = globalController(eventQuery, 'eventsController');

export const addEventController = async (req, res) => {
  try {
    const result = await globalQueryHelper(req.body, addEventHelper, 'addEventHelper', ['userId', 'workoutId', 'workoutName', 'desc', 'month', 'day', 'year', 'startHour', 'startMinute', 'endHour', 'endMinute', 'second']);

    success(`addEventController - successfully inserted event table`);
    return res.status(200).send();
  } catch (err) {
    error(`addEventController - error= ${err}`);
    return res.status(500).send(err);
  }
};