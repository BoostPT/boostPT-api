import { globalController } from '../../lib/components/';
import { userQuery } from './userQueries';

export const userController = globalController(userQuery , 'userController');