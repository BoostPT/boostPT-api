import { globalController } from '../../lib/utils/queryHelpers';
import { userQuery } from './userQueries';

export const userController = globalController(userQuery , 'userController');