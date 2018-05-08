import { globalController } from '../../lib/utils/queryHelpers';
import { workoutQuery } from './workoutQueries';

export const workoutController = globalController(workoutQuery , 'workoutController');