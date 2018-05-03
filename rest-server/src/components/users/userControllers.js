import { globalController } from '../../lib/utils/queryHelpers.js';
import { userQuery } from './userQueries';

export const userController = globalController(userQuery , 'userController');